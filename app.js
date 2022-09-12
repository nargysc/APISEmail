const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

require("dotenv").config();

mongoose.connect("mongodb://localhost:27017/EmployeeTeam",{}).then(() => {
    console.log("Connected Succesfully");
}).catch((e) => {
    console.log("Connection Failed");
})

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

const userRoutes = require("./routes/user");


app.use("/api", userRoutes);

const port = 3001;

app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
