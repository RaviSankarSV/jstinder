const express = require('express');
const connectDB = require('../configuration/database');
const app = express();
const User = require('../models/user');

app.post("/signup", async (req, res) => {
    const userObj = {
        firstName: "Siva",
        lastName: "Sankar",
        emailId: "sivasankaremail@gmail.com",
        password: "sankarpassword555",
        age: 38,
        gender: "male"
    }

    //craating a new instance of User Object and inserting into model User
    const user2 = new User(userObj);
    await user2.save();
    res.send("User created successfully");
})

connectDB()
    .then(() => {
        console.log("Database connection established");
        app.listen('7777', () => {
            console.log("server started and listening at 7777");
        })
    })
    .catch((err) => {
        console.error("Databse connection cannot be established", err);
    })