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
async function addUser(username, emailuser,passworduser) {
    const newUser = new User({ name: username, email: emailuser, password: passworduser });
    try {
        const result = await newUser.save();
        console.log('Save successful:', result);
      } catch (error) {
        console.error('Save error:', error);
      }
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

addUser("Flavio","flaviocormerais@gmail.com","123456")
app.listen(8000, () => {
    console.log("server started on port 8000");

});

ex