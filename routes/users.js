const express = require('express');
const router = express.Router();
const {getAllUsers, createUser} = require('../controller/user');


// create a route to get all users
router.route('/getAllUsers').get(async (req, res) => {
    //call the router to get all users
    const result = await getAllUsers();
    res.status(result.status).json({result: result.data});
});

router.route('/createUser').post(async (req, res) => { 
    console.log(req)
    console.log(req.body);
    const {firstName, lastName, age, weigth, height}  = req.body; 
    const result = await createUser(req.body);
});

module.exports = router;
