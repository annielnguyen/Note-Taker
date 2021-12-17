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
app.use(express.static('public'));

//API route get request
app.get("/api/notes", function(req, res) {
    readFileAsync("./develop/db/db.json", "utf8").then(function(data) {
        notes = [].concat(JSON.parse(data))
        res.json(notes);
      })
  }); 
  