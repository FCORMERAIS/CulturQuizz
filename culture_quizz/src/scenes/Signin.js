import '../style/Signin.css'
import { useState } from 'react';

const Signin = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // const hashpassword = () => {
    //     let hash = 0;
    //     if (password.length < 8 ) alert('Votre mot de passe est trop court');
    //         for (let i = 8; i < password.length; i++) {
    //             let char = password.charCodeAt(i);
    //             hash = ((hash << 5) - hash) + char;
    //             hash = hash & hash;
    //         }
    //         return hash;
    // }

    // fonction pour déhasher les mots de passe

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, email, password); 
        // console.log(hashpassword());
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