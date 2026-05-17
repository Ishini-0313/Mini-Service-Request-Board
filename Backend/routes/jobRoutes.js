const express = require('express');

const {getAllJobs, getJobById, createJob, updateJobStatus, deleteJob} = require('../controllers/jobController.js');

const protect = require('../middleware/authMiddleware.js');

const router = express.Router();

router.get('/api/jobs', getAllJobs);

router.get('/api/jobs/:id', getJobById);

router.post('/api/jobs', protect, createJob);

router.put('/api/jobs/:id', updateJobStatus);

router.delete('/api/jobs/:id', protect, deleteJob);

module.exports = router;