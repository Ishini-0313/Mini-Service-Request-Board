const express = require('express');

const {getAllJobs, getJobById, createJob, updateJobStatus, deleteJob} = require('../controllers/jobController.js');

const router = express.Router();

router.get('/api/jobs', getAllJobs);

router.get('/api/jobs/:id', getJobById);

router.post('/api/jobs', createJob);

router.put('/api/jobs/:id', updateJobStatus);

router.delete('/api/jobs/:id', deleteJob);

module.exports = router;