const express = require('express');
const { getConfirmationByPostId, getConfirmationByUsersIds, createConfirmation, checkConfirmationStatus, updateConfirmation } = require('./confirmation.controllers');
const router = express.Router();
const { authenticateToken } = require("../middlewares/auth.js");


router.post('/', authenticateToken, createConfirmation);

router.put('/:conId', authenticateToken, updateConfirmation);

router.get('/:conId/status', checkConfirmationStatus);

router.get('/post/:postId', getConfirmationByPostId);

router.get('/users', getConfirmationByUsersIds);

module.exports = router;
