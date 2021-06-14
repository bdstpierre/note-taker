// DEPENDENCIES
// npm packages that we will use to give our server functionality

const express = require('express');
const path = require('path');
const fs = require('fs');

// EXPRESS CONFIGURTATION
// Create an express server
const app = express();

// Set the initial port
const PORT = process.env.PORT || 8080;

// Set up the Express app to handle data parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Set up the Express app to serve static assets directly
app.use(express.static('public'));

//ROUTER
// Set up the routes for the Express app to use to respond to different url requests

// => HTML GET Requests

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// => api GET Requests
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        };
        let db = JSON.parse(data);
        res.json(db);
    });
});


// api POST Requests
app.post('/api/notes', (req, res) => {
    // First get the notes from the db
    let db;
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        };
        db = JSON.parse(data);
    
        // Next add the new note to the array of notes
        db.push(req.body);

        res.json(req.body);
        fs.writeFile('./db/db.json', JSON.stringify(db), () => {
            if (err) {
                console.error(err)
                return
            };
        });
    });
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});


//LISTENER
// Start the Express app
app.listen(PORT, () => {
    console.log(`App listneing on PORT: ${PORT}`);
});