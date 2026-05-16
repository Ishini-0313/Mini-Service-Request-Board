const jobRequest = require('../models/jobRequestModel.js');

// get all jobs
const getAllJobs = async (req, res, next) => {
    try{
        const filter = {};

        // jobs filter by category
        if(req.query.category){
            filter.category = req.query.category;
        }

        // jobs filter by status
        if(req.query.status){
            filter.status = req.query.status;
        }

        const jobs = await jobRequest.find(filter).sort({
            createdAt : -1 //decsending order
        });

        res.json(jobs);

    }catch(error){
        next(error); //error sends to express error middleware
    }
};

// get a job by id 
const getJobById = async (req, res, next) => {
    try{
        const job = await jobRequest.findById(req.params.id);

        if(!job){
            return (res.status(404).json({
                message : "Job Not Found"
            }));
        }

        res.json(job);

    }catch(error){
        next(error);
    }
};

// insert a job
const createJob = async (req, res, next) => {
    try{
        const {title, description, category, location, contactName, contactEmail} = req.body;

        if(!title || !description){
            return (res.status(400).json({
                message : "Title and description are required!"
            }));
        }

        const job = await jobRequest.create({title, description, category, location, contactName, contactEmail});

        res.status(201).json(job);

    }catch(error){
        next(error);
    }
};


// update job status
const updateJobStatus = async (req, res, next) => {
    try{
        const job = await jobRequest.findById(req.params.id);

        if(!job){
            return (res.status(404).json({
                message : "Job Not Found"
            }));
        }
        const {status} = req.body;

        job.status = status;
        await job.save();
        res.json(job);
    }catch(error){
        next(error);
    }
};

// delete a job
const deleteJob = async (req, res, next) => {
    try{
        const job = await jobRequest.findById(req.params.id);

        if(!job){
            return (res.status(404).json({
                message : "Job Not Found"
            }));
        }
        
        await job.deleteOne();

        res.json({
            message : "Job deleted"
        });
        
    }catch(error){
        next(error);
    }
};


module.exports = {
    getAllJobs,
    getJobById,
    createJob,
    updateJobStatus,
    deleteJob
};
