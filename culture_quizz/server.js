const express = require('express')
const mongoose = require('mongoose')
const app = express()

const uri = 'mongodb+srv://flaviocormerais3:MariusIlSentPasTrèsBon*10@cluster0.e1iclct.mongodb.net/?retryWrites=true&w=majority'

async function connect() {
    try {
        await mongoose.connect(uri);
        console.log("conect to MongoDB");
    }catch (error) {
        console.log(error);
    }
}


// Insérer un document dans la collection
function addUser(username, emailuser,passworduser) {
    const newUser = new User({ name: username, email: emailuser, password: passworduser });
    newUser.save((err, savedUser) => {
        if (err) {
        console.error(err);
        } else {
        console.log('User saved:', savedUser);
        }
    });
}


connect();



// Créer un schéma pour spécifier la structure des documents
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});



const questionSchema = new mongoose.Schema({
    text: {type : String,required : true},
    type : {type : String, required : true},
    options: {type:String, required :false},
})



const roomSchema = new mongoose.Schema({
    players : {type : String, required : false},
    isPlaying : { type : Boolean, required : true, default : false},
})



// Créer un modèle à partir du schéma
const User = mongoose.model('User', userSchema);
const Question = mongoose.model('Question', questionSchema);
const Room = mongoose.model('Room', roomSchema);



app.listen(8000, () => {
    console.log("server started on port 8000");

});