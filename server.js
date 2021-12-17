//Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");

//set up server
const PORT = process.env.PORT || 3001;
const app = express();

// Set up express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Add a static middleware for serving assets in the public folder
app.use(express.static("./develop/public"));

// Async processes
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

//API post requests

app.post("/api/notes", function(req, res) {
    const note = req.body;
    readFileAsync("./Develop/db/db.json", "utf8").then(function(data) {
      const notes = [].concat(JSON.parse(data));
      note.id = notes.length + 1
      notes.push(note);
      return notes
    }).then(function(notes) {
      writeFileAsync("./Develop/db/db.json", JSON.stringify(notes))
      res.json(note);
    })
  });

// HTML Routes
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "Develop/public/notes.html"));
    });
  
  app.get("/", function(req, res) {
       res.sendFile(path.join(__dirname, "Develop/public/index.html"));
    });
  
    app.get("*", function(req, res) {
      res.sendFile(path.join(__dirname, "Develop/public/index.html"));
   });

// Listen for connections
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
