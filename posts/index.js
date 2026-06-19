// Importe le framework Express pour créer un serveur web
const express = require("express");

// Importe body-parser pour traiter les données JSON reçues dans les requêtes
const bodyParser = require("body-parser");

// Importe la fonction randomBytes du module crypto pour générer des identifiants aléatoires
const { randomBytes } = require("crypto");
const cors = require("cors");

// Crée une instance de l'application Express
const app = express();

// Active le middleware qui convertit automatiquement le corps JSON des requêtes en objet JavaScript
app.use(bodyParser.json());
app.use(cors());

// Objet qui servira à stocker les posts en mémoire
// Exemple :
// {
//   "a1b2c3d4": {
//     id: "a1b2c3d4",
//     title: "Mon premier post"
//   }
// }
const posts = {};

// Route GET /posts
// Permet de récupérer tous les posts enregistrés
app.get("/posts", (req, res) => {
  // Envoie l'objet contenant tous les posts au client
  res.send(posts);
});

// Route POST /posts
// Permet de créer un nouveau post
app.post("/posts", (req, res) => {
  // Génère un identifiant unique aléatoire de 8 caractères hexadécimaux
  const id = randomBytes(4).toString("hex");

  // Récupère la propriété "title" envoyée dans le corps de la requête
  const { title } = req.body;

  // Crée un nouvel objet post et le stocke dans l'objet posts
  posts[id] = {
    // Identifiant du post
    id,

    // Titre du post
    title,
  };

  // Retourne une réponse HTTP 201 (Created)
  // contenant le post qui vient d'être créé
  res.status(201).send(posts[id]);
});

// Démarre le serveur sur le port 4000
app.listen(4000, () => {
  // Affiche un message dans la console lorsque le serveur est prêt
  console.log("Listening on 4000");
});
