// DEPENDENCIES
// npm packages that we will use to give our server functionality

const express = require('express');

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



//LISTENER
// Start the Express app
app.listen(PORT, () => {
    console.log(`App listneing on PORT: ${PORT}`);
});