const express = require("express");
const app = express();

//anything that points at /api/notes will use notes.js to define its fetch methods
const notesRouter = require("./notes");

//Intending to point at https://localhost:3001/api/notes
app.use("/notes", notesRouter);
module.exports = app;
