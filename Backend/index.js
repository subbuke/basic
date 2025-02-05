const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const mongoose = require("mongoose");
const cors = require("cors")

app.use(cors())
app.use(express.json)


app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get("/test", (req, res) => {
         res.send('tested route successfully');
})



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});