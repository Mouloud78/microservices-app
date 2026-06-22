const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

//THIS
// app.post("/events", async (req, res) => {
//   const event = req.body;

//   await axios.post("http://localhost:4000/events", event);
//   await axios.post("http://localhost:4001/events", event);
// await axios.post("http://localhost:4002/events", event);

//   res.send({ status: "OK" });
// });

//OR
app.post("/events", async (req, res) => {
  const event = req.body;

  const services = [4000, 4001, 4002, 4003];

  for (const port of services) {
    try {
      await axios.post(`http://localhost:${port}/events`, event);
    } catch (err) {
      console.error(`Erreur lors de l'envoi vers ${port}`);
    }
  }

  res.send({ status: "OK" });
});

app.listen(4005, () => {
  console.log("Events Bus listening on port 4005");
});
