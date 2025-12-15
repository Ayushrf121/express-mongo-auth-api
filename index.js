const express = require("express");
const app = express();

// importing the routers..
const AuthRouter = require("./Routes/AuthRouter");
const ProductRouter = require("./Routes/ProductRouter");

// defining the port in env.
require('dotenv').config();

// bpdy-parser : to get the datafrom the client and use them to the server.
/*
body-parser is a middleware used in Express.js applications to parse the body of incoming HTTP requests — for example, data sent via a form (HTML <form>) or JSON (from a frontend or API client like Postman).
By default, Node.js does not understand the body of incoming requests — it only handles the headers and URL.
So body-parser helps Express read that data easily.
*/   
const bodyParser = require("body-parser");

// to make the port interactive with each other so we use the cors library over here
const cors = require("cors");

// require to import the database file....
require('./Models/db'); 
// either go with env port otherwise with the hardcore port.
const port = process.env.PORT || 8080 ; 

// middlewares : Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option.
app.use(bodyParser.json());

// middlewares : Returns middleware that allow to access from anywhere else with app.use(cors([])) share a dependency to make more secure.
app.use(cors());
app.use("/auth",AuthRouter); 
app.use("/products",ProductRouter); 

app.get('/',(req,res)=>{
    res.send("Hello I am Ayush ");
})

app.listen(port,()=>{
    console.log(`Listening at the port ${port}`);
})