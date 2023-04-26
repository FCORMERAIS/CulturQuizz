require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Configurer CORS middleware
app.use(cors());

// Connecter à la base de données MongoDB
mongoose.connect("mongodb+srv://flaviocormerais3:MariusIlSentPasTrèsBon*10@cluster0.e1iclct.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB Connection Error', error);
});

// Définir les middlewares pour parser les requêtes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Définir les routes de votre application
const questionRouter = require('./routes/question');
app.use('/questions', questionRouter);

// Démarrer le serveur
app.listen(3000, () => {
  console.log(`Server started on port ${3000}`);
});
