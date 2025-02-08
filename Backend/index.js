const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const mongoose = require("mongoose");
const cors = require("cors")
const UserModel = require("./Models/Users");

app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get("/test", (req, res) => {
         res.send('tested route successfully');
})

app.get("/getusers", (req, res) => {
    UserModel.find({}).then(function(users) {
          res.json(users)
    }).catch(function(error) {
        res.json(error)
    })
})

app.post("/createUsers", async (req, res) => {
    try {
        const user = req.body;
        const newUser  = new UserModel(user);
        await newUser .save();
        res.status(201).json(newUser ); // Return the created user with a 201 status
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Failed to create user', details: error });
    }
});

mongoose.connect('mongodb+srv://subramanyamchowdam7654:subbu1919@cluster2.0ybx9.mongodb.net/project?retryWrites=true&w=majority&appName=Cluster2')
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});