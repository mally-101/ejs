const express = require('express');
const router = express.Router();
const TASKS = require('../model/taskModel')
const { create_task, create_router, delete_task } = require('../controller/taskController')
// /post route c----create
router.post('/create', create_task)
router.get('/route/:id',create_router)

// delete route D --delete
router.get('/delete/:id',delete_task);

module.exports = router;
