const express = require('express');
const connectDB = require('../configuration/database');
const User = require('../models/user');
const user = require('../models/user');
const { default: mongoose } = require('mongoose');

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
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;

    try {
        const user = await User.find({ "emailId": userEmail });
        if (user.length === 0) {
            res.status(404).send("User not found");
        } else {
            res.send("user details fetched successfully:" + user);
        }

    } catch (err) {
        console.error("Error fetching user details", err);
        res.status(500).send("Error fetching user details");
        res.status(404).send("User not found");
    }
})

app.get("/feed", async (req, res) => {
    //const user = new User();
    try {
        const users = await user.find({}).exec();
        res.send("number of records:" + users.length + " \n" + "  User Data " + users);
        // res.status(200).send("User Data:" + users);

    } catch (err) {
        res.status(404).send("NO Data Found");
    }

})

app.get("/byId", async (req, res) => {

    try {
        //const userDetails = await user.findById({ "_id": req.body._id });
        const userDetails = await user.findById(req.body._id);
        res.status(200).send("User Details with Id:" + userDetails);
    } catch (err) {
        res.status(404).send("No data found with this id:" + id);
    }
})

app.delete("/deleteById", async (req, res) => {
    try {
        const userDeleted = await user.findByIdAndDelete(req.body._id);
        res.send("User deleted successfully" + userDeleted);
    } catch (err) {
        res.status(500).send("Something went wrong!!!" + err);
    }
})

app.patch("/updateByEmailId", async (req, res) => {
    try {
        //const userUpdated = await user.findByIdAndUpdate({ "_id": req.body._id }, req.body);
        const userUpdated = await user.findOneAndUpdate({ "emailId": req.body.emailId }, req.body, {
            returnDocument: 'after'
        });
        res.send("User Data updated:" + userUpdated);
    } catch (err) {
        res.status(500).send("Something went Wrong!!!" + err);
    }
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