const express = require("express");
const path = require("path");
// const termData = require('./db/terms.json');
const PORT = 3001;
const app = express();

//Middleware for parsing data. the two lines below give the ability to parse JSON or urlencoded format
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//points anything with a /api address to look at routeIndex for routing
app.use("/api", require("./routes/routeIndex"));
app.use(express.static("public"));

//This is the route for the home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// This was to test loading the notes.html page
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "/public/pages/404.html"));
// });

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
