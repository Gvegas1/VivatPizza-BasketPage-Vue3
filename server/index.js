const express = require("express");
const cors = require("cors");
const MOCK_DB = require("./db.json");

const app = express();

const PORT = 7000;

app.use(cors());

app.get("/products", (req, res) => {
  res.status(200).json(MOCK_DB.products);
});
app.get("/gifts", (req, res) => {
  res.status(200).json(MOCK_DB.gifts);
});
app.get("/", (req, res) => {
  res.status(200).json(MOCK_DB);
});

app.listen(PORT, () =>
  console.log("SERVER STARTED ON http://localhost:" + PORT)
);
