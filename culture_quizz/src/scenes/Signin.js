import '../style/Signin.css'
import { useState } from 'react';

const Signin = () => {
    const bcrypt = require('bcrypt');
    const [name, setName] = useState('');
    const [firstname, setFirstname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, firstname, email, password);
        bcrypt.hash(password, 10, function(err, hash) {

        }); 
    }

    return(
        <div id='signin'>
            <div id='card'>
                <h2>Créer un compte</h2>
                <form>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} name="name" placeholder="Votre nom" required /><br/>
                    <input type="text" id="firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)} name="firstname" placeholder="Votre prénom" required /><br/>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" placeholder="Votre email" required /><br/>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" placeholder="Votre mot de passe" required /><br/>
                    <button type="submit">Créer un compte</button><br/>
                    <a href='./login'>Vous avez déjà un compte ?</a>
                </form>
            </div>
        </div>
    );
};

export default Signin;