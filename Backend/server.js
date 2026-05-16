const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
require("dotenv").config();
const jobRoutes = require("./routes/jobRoutes");

const app = express();

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use(jobRoutes); 

app.listen(5000, () => {
    console.log("Server running on port 5000");
});