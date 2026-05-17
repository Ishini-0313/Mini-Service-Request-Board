const mongoose = require('mongoose');
const jobRequest = require('./models/jobRequestModel.js');
const dotenv = require('dotenv');

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const jobs = [
    {
        title: "Fix leaking tap",
        description: "Kitchen sink leaking",
        category: "Plumbing",
        location: "Glasgow",
        contactName: "John",
        contactEmail: "john@gmail.com"
    },
    {
        title: "Install lights",
        description: "LED lights installation",
        category: "Electrical",
        location: "Manchester",
        contactName: "David",
        contactEmail: "david@gmail.com"
    },
    {
        title: "Paint bedroom",
        description: "Need white paint",
        category: "Painting",
        location: "Edinburgh",
        contactName: "Alice",
        contactEmail: "alice@gmail.com"
    }
];

const seed = async ()=>{
    await jobRequest.insertMany(jobs);
    console.log("Seeded Successfully");
    process.exit();
};

seed();