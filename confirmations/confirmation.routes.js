const express = require('express');
const { getConfirmationByPostId, getConfirmationByUsersIds, createConfirmation, checkConfirmationStatus, updateConfirmation } = require('./confirmation.controllers');
const router = express.Router();

router.post('/', createConfirmation);

router.put('/:id', updateConfirmation);

router.get('/:id/status', checkConfirmationStatus);

router.get('/post/:postId', getConfirmationByPostId);

router.get('/users/:userId/:ownerId', getConfirmationByUsersIds);

module.exports = router;
