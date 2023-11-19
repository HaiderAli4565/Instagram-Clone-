
const express = require("express");
const app = express();
const PORT = 5000;
const mongoose = require("mongoose");
const { mongoUrl } = require("./keys");
const cors = require('cors')

app.use(cors())
require('./models/model')
require("./models/post")

app.use(express.json())
app.use(require("./routes/auth")) //middleware func
app.use(require("./routes/createPost"))
mongoose.connect(mongoUrl)

mongoose.connection.on("connected", () => {

    console.log("Successfully connected to mongoose")
})

mongoose.connection.on("error", () => {
    console.log("Not connected")
})

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT)
})