// Importe le framework Express pour créer le serveur web
const express = require("express");

// Importe body-parser pour lire le contenu JSON des requêtes HTTP
const bodyParser = require("body-parser");

// Importe la fonction randomBytes du module crypto pour générer des identifiants aléatoires
const { randomBytes } = require("crypto");

// Crée une instance de l'application Express
const app = express();

// Configure Express pour analyser automatiquement les corps de requêtes au format JSON
app.use(bodyParser.json());

// Objet qui stocke les commentaires regroupés par identifiant de post
// Exemple :
// {
//   "123": [
//     { id: "abc1", content: "Super article !" },
//     { id: "def2", content: "Très intéressant." }
//   ]
// }
const commentsByPostId = {};

// Route GET pour récupérer tous les commentaires d'un post spécifique
app.get("/posts/:id/comments", (req, res) => {
  // Retourne les commentaires associés à l'id du post
  // Si aucun commentaire n'existe, retourne un tableau vide
  res.send(commentsByPostId[req.params.id] || []);
});

// Route POST pour ajouter un commentaire à un post spécifique
app.post("/posts/:id/comments", (req, res) => {
  // Génère un identifiant unique de 4 octets converti en chaîne hexadécimale
  const commentId = randomBytes(4).toString("hex");

  // Récupère la propriété "content" envoyée dans le corps de la requête
  const { content } = req.body;

  // Récupère les commentaires existants du post
  // Si aucun commentaire n'existe encore, crée un tableau vide
  const comments = commentsByPostId[req.params.id] || [];

  // Ajoute le nouveau commentaire dans le tableau
  comments.push({
    id: commentId,
    content,
  });

  // Met à jour le stockage des commentaires pour ce post
  commentsByPostId[req.params.id] = comments;

  // Retourne une réponse HTTP 201 (Created) avec la liste des commentaires du post
  res.status(201).send(comments);
});

// Démarre le serveur sur le port 4001
app.listen(4001, () => {
  // Affiche un message dans la console lorsque le serveur est prêt
  console.log("Listening on 4001");
});
