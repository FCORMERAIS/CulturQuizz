import '../../style/Signin.css'
import { useState } from 'react';
import Cookies from 'js-cookie';



const Signin = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function verifierEmail() {
        var emailInput = document.getElementById('email');
        var erreurEmail = document.getElementById('erreur-email');
        console.log("ON EST LA");
        if (emailInput.value.indexOf('@') === -1) {
            erreurEmail.innerHTML = 'L\'adresse email doit contenir un caractère @.';
            emailInput.classList.add('erreur');
        } else {
            erreurEmail.innerHTML = '';
            emailInput.classList.remove('erreur');
        }
    }

    function testemail() {
        if (email.length > 10) {
            return true
        }else {
            return false
        }
    }

    function testPassword() {
        // const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s:])([^\s]){8,}$/;
        // return regex.test(password);
        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (testemail()) {
            if (testPassword()) {
                let newUser = {"pseudo" : name, "email": email, "password": password };
                let xhr = new XMLHttpRequest();
                xhr.open("POST","http://localhost:3000/users",true);
                xhr.setRequestHeader('Content-Type', 'application/json')
                xhr.onload = function () {
                    console.log("Connected");
                };
                xhr.send(JSON.stringify(newUser));
                Cookies.set('Pseudo', name, { expires: 7 });
                console.log(newUser)
                window.location.href = "http://localhost:3001/"
            } else {
                alert("Password pas bon");
            }
        } else {
            alert("Email pas bon");
        }
    }

    return(
        <div id='signin'>
            <div id='card'>
                <h2 id='sigin'>Créer un compte</h2>
                <form class='formSignin'>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} name="name" placeholder="Votre nom" required /><br/>
                    <input type="email" id="email" onInput={verifierEmail} value={email} onChange={(e) => setEmail(e.target.value)} name="email" placeholder="Votre email" required /><br/>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" placeholder="Votre mot de passe" required /><br/>
                    <span id="erreur-email"></span>
                    <button type="submit" onClick={handleSubmit}>Créer un compte</button><br/>
                    <a href='./login'>Vous avez déjà un compte ?</a>
                </form>
            </div>
        </div>
    );
};

export default Signin;
