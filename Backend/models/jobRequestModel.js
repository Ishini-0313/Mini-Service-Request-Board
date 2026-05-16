const mongoose = require('mongoose');

const jobReqSchema = new mongoose.Schema(
    {
        title : {
            type : String,
            required : true
        },
        description : {
            type : String,
            required : true
        },
        category : {
            type : String
        },
        location : {
            type : String
        },
        contactName : {
            type : String
        },
        contactEmail : {
            type : String,
            match : [/^\S+@\S+\.\S+$/ , "Invalid Email"]
        },
        status : {
            type : String,
            enum : ["Open", "In Progress", "Closed"],
            default : "Open"
        }
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: false
        }
    }
);

module.exports = mongoose.model("JobRequest", jobReqSchema);
