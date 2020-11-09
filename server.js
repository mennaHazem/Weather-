// Setup empty JS object to act as endpoint for all routes
projectData = {};


// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();
/* Dependencies*/
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
const port = 8000
;

// Setup Server
const server = app.listen(port, listening);

function listening()
{
    console.log('server running');
    console.log(`running on the localhost: ${port}`);
}

//GET route 
app.get('/all', sendingData);
function sendingData (request, response)
{
    response.send(projectData);
}
// POST route
app.post('/add', addingData);
function addingData (request, response)
{   
    console.log(request.body);
    projectData.date = request.body.date;
    projectData.temperature = request.body.temperature;
    projectData.user_response = request.body.user_response;

    console.log(projectData);
}