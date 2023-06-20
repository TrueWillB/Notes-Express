const notes = require("express").Router();
//from now on, notes is the router pointing at /api/notes
const uuid = require("../helpers/uuid");
const { readFromFile, readAndAppend } = require("../helpers/fsUtils");

//This defines what happens when a "GET" request is invoked on the /api/notes route
notes.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

//This defines what happens when a "POST" request is invoked on the /api/notes route
notes.post("/", (req, res) => {
  console.info(`${req.method} request received to add a note`);
  console.log(`This is the note request body: ${req.body}`);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      note_id: uuid(),
    };

    readAndAppend(newNote, "./db/db.json");
    res.json(`Note added successfully, ID = ${newNote.note_id}`);
  } else {
    res.error("Error in adding note");
  }
});

module.exports = notes;
