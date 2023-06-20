const notes = require("express").Router();
//from now on, notes is the router pointing at /api/notes
const uuid = require("../helpers/uuid");
const { readFromFile, readAndAppend } = require("../helpers/fsUtils");

//This defines what happens when a "GET" request is invoked on the /api/notes route
notes.get("/", (req, res) => {
  return readFromFile("./db/db.json").then((data) =>
    res.json(JSON.parse(data))
  );
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
      id: uuid(),
    };

    readAndAppend(newNote, "./db/db.json");
    res.json(`Note added successfully, ID = ${newNote.id}`);
  } else {
    res.error("Error in adding note");
  }
});

notes.delete("/:id", (req, res) => {
  console.log(`This is the id of the note to be deleted: ${req.params.id}`);
  let noteId = req.params.id;
  console.log(`This is the note id of the note to be deleted: ${noteId}`);
  readFromFile("./db/db.json")
    .then((data) => {
      // console.log(`This is the data: ${data}`);
      return data;
    })
    .then((currentNotes) => {
      //This puts the index of the note to be deleted into "indexToDelete"
      console.log(`This is the array before deleting: ${currentNotes}`);

      let indexToDelete = currentNotes.findIndex(
        (noteObj) => noteObj.id == noteId
      );
      console.log(
        `This is the index of the note to be deleted: ${indexToDelete}`
        // `This is the note id of the note to be deleted: ${noteID}`
      );
      if (indexToDelete > -1) {
        currentNotes.splice(indexToDelete, 1); //Deletes the note from the array
        writeToFile("./db/db.json", currentNotes); //This writes the array back to the db.json file
        console.log(`This is the array after deleting: ${currentNotes}`);
      }
    });
});

module.exports = notes;
