import '../style/Login.css'
import { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // si le mot de passe n'est pas correct
    const incorrectPassword = () => {
        let incorrectPassword = document.querySelector('.incorrectPassword');
        incorrectPassword.innerHTML = 'Mot de passe incorrect';
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, password);
        // si le mot de passe est incorrect
        incorrectPassword();
    }
    return(
        <div id='login'>
            <div id='card'>
                <h2>Avez-vous un compte ?</h2>
                <form>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" placeholder="Votre email" required /><br/>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" placeholder="Votre mot de passe" required /><br/>
                    <p class='incorrectPassword'>

                    </p>
                    <button type="submit" onClick={handleSubmit}>Se connecter</button><br/>
                    <a href='./signin'>Vous n'avez pas encore de compte ?</a>
                </form>
            </div>
        </div>
    );    
};


export default Login;