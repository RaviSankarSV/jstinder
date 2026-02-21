const express = require('express');
const connectDB = require('../configuration/database');
const User = require('../models/user');

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
    
    console.log("req", req.body);

    // const userObj = {
    //     firstName: "MS",
    //     lastName: "Dhoni",
    //     emailId: "dhoniemail@gmail.com",
    //     password: "sankarpassword555",
    //     age: 38,
    //     gender: "male"
    // }

    // //craating a new instance of User Object and inserting into model User
    const user = new User(req.body);
    await user.save();
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