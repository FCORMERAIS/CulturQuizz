import '../../style/Signin.css'
import { useState } from 'react';
import Cookies from 'js-cookie';

const Signin = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        let newUser = {Pseudo : name, Email: email, Password: password };
        let xhr = new XMLHttpRequest();
        xhr.open("POST","http://localhost:3000/users",true);
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.onload = function () {
            console.log("Connected");
        };
        xhr.send(JSON.stringify(newUser));
        Cookies.set('Pseudo', name, { expires: 7 });
        window.location.href = "http://localhost:3001/"
    }


    return(
        <div id='signin'>
            <div id='card'>
                <h2>Créer un compte</h2>
                <form class='formSignin'>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} name="name" placeholder="Votre nom" required /><br/>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" placeholder="Votre email" required /><br/>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" placeholder="Votre mot de passe" required /><br/>
                    <button type="submit" onClick={handleSubmit}>Créer un compte</button><br/>
                    <a href='./login'>Vous avez déjà un compte ?</a>
                </form>
            </div>
        </div>
    );
};

export default Signin;