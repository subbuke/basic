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