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

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

//I found this info online. You have to use a port dynamically set by heroku, or 3001 if running locally
app.listen(process.env.PORT || 3000, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});
