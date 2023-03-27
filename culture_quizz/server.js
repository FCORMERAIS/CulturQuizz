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

connect();

app.listen(8000, () => {
    console.log("server started on port 8000");

});