// Create express app
import "reflect-metadata"
import express from "express";
import cors from 'cors';

import User from "./src/User/user.route.js";

const app = express()
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Server port
const HTTP_PORT = 7000
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});
// Root endpoint
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

// Insert here other API endpoints
app.use('/api', User)

// Default response for any other request
app.use(function(req, res){
    res.status(404);
});