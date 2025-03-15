const express = require('express');
const router = express.Router();
const {getAllUsers} = require('../controller/user');


// create a route to get all users
router.route('/getAllUsers').get(async (req, res) => {
    //call the router to get all users
    const result = await getAllUsers();
    res.status(result.status).json({result: result.data});
});

module.exports = router;
