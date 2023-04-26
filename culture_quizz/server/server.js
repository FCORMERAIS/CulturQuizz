require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://flaviocormerais3:MariusIlSentPasTrèsBon*10@cluster0.e1iclct.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const QuestionRouter = require('./routes/question')
app.use('/questions', QuestionRouter)

app.listen(3000, () => console.log('Server Started'))