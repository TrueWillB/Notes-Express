const notes = require("express").Router();
//from now on, notes is the router pointing at /api/notes
const uuid = require("../helpers/uuid");
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../helpers/fsUtils");

//This defines what happens when a "GET" request is invoked on the /api/notes route
notes.get("/", (req, res) => {
  return readFromFile("./db/db.json").then((data) =>
    res.json(JSON.parse(data))
  );
});

//This defines what happens when a "POST" request is invoked on the /api/notes route
notes.post("/", (req, res) => {
  console.info(`${req.method} request received to add a note`);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(newNote, "./db/db.json");
    res.json(`Note added successfully, ID = ${newNote.id}`);
  } else {
    res.error("Error in adding note");
  }
});

//THIS SECTION IS STILL NOT COMPLETE. The proper note is deleted from the db file, however, I cannot seem to get the app to recognize and refresh.
// I'm not sure if the problem is something missing from this delete request, or the fetch is set up wrong, or there is something in the index.js when deleteNote() is invoked. I am at a loss
notes.delete("/:id", (req, res) => {
  let noteId = req.params.id;
  readFromFile("./db/db.json")
    .then((data) => {
      return JSON.parse(data);
    })
    .then((currentNotes) => {
      //This puts the index of the note to be deleted into "indexToDelete"

      let indexToDelete = currentNotes.findIndex((note) => note.id === noteId);
      if (indexToDelete > -1) {
        currentNotes.splice(indexToDelete, 1); //Deletes the note from the array
        writeToFile("./db/db.json", currentNotes); //This writes the array back to the db.json file
      }
    });
});

module.exports = notes;
