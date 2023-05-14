import '../../style/Login.css'
import { useState,useEffect } from 'react';
import Cookies from 'js-cookie';
import { redirect } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [AllAccount, setAllAccount] = useState([]);

    useEffect(() => {
        // Fetch data from URL using promise
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:3000/users');
            const data = await response.json();
            setAllAccount(data);
          } catch (error) {
            console.error(error);
          }
        };
        fetchData();
      }, []);
    function testEmail(email,password) {
        for (let index = 0; index < AllAccount.length; index++) {
            const account = AllAccount[index];
            if (account.email === email) {
                return testPassword(account,password)
            }
        }
        let incorrectPassword = document.querySelector('.incorrectPassword');
        incorrectPassword.innerHTML = "un compte avec l'aresse email renseigné n'existe pas";
        return false
    }
    function testPassword(account,password) {
        if (password === account.password) {
            return account
        }
        let incorrectPassword = document.querySelector('.incorrectPassword');
        incorrectPassword.innerHTML = "Vous vous êtes tromper de mot de passe ";
        return false
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        // si le mot de passe est incorrect
        let conn = testEmail(email,password)
        if (conn !== false) {
            let Connected = document.querySelector('.Connected');
            Connected.innerHTML = "connecter en tant que "+ conn.pseudo;
            Cookies.set('Pseudo', conn.pseudo, { expires: 7 });
            window.location.href = "http://localhost:3001/"
        }
    }
    return(
        <div id='login'>
            <div id='card'>
                <h2 id='logins'>Avez-vous un compte ?</h2>
                <form class='formLogin'>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" placeholder="Votre email" required /><br/>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" placeholder="Votre mot de passe" required /><br/>
                    <p class='incorrectPassword'>

                    </p>
                    <p class="Connected">

                    </p>
                    <button type="submit" onClick={handleSubmit}>Se connecter</button><br/>
                    <a href='./signin'>Vous n'avez pas encore de compte ?</a>
                </form>
            </div>
        </div>
    );    
};


export default Login;