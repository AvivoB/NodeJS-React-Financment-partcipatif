// Importation des modules nécessaires
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

// Création de l'application express
const app = express();

// const connection = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'your_username',
//     password : 'your_password',
//     database : 'your_database'
//   });
  
//   connection.connect(error => {
//     if (error) {
//       console.error('Erreur de connexion à la base de données : ', error);
//       return;
//     }
//     console.log('Connecté à la base de données MySQL!');
//   });

// Configuration du middleware bodyParser pour analyser les requêtes HTTP
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route de base
app.get('/', (req, res) => {
  res.send('Bienvenue sur notre backend Node.js!');
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});