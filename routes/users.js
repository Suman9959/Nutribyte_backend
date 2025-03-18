const express = require('express');
const router = express.Router();
const {getAllUsers, createUser, createOrUpdateProfile, getUserProfile} = require('../controller/user');
const { verifyToken } = require('../middleware/auth');

// create a route to get all users(no authentication required)
router.route('/getAllUsers').get(async (req, res) => {
    //call the router to get all users
    const result = await getAllUsers();
    res.status(result.status).json({result: result.data});
});


// Route to create a basic user (no authentication required)
router.route('/createUser').post(async (req, res) => { 
    console.log(req.body);
    //const {firstName, lastName, age, weigth, height}  = req.body; 
    const result = await createUser(req.body);
    res.status(result.status).json(result);
});





//
// Protected routes with Clerk authentication
// Create or update user profile
router.route('/createProfile').post(verifyToken, async (req, res) => {
    try {
        const userId = req.userId; // From the token verification middleware
        const profileData = req.body;
        
        // Verifying that the userId from the token matches the userId in the request (if provided)
        if (profileData.userId && profileData.userId !== userId) {
            return res.status(403).json({ error: 'Forbidden: User ID mismatch' });
        }
        
        const result = await createOrUpdateProfile(userId, profileData);
        res.status(result.status).json(result);
    } catch (error) {
        console.error('Error in create profile route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get user profile
router.route('/profile').get(verifyToken, async (req, res) => {
    try {
        const userId = req.userId; // From the token verification middleware
        const result = await getUserProfile(userId);
        res.status(result.status).json(result);
    } catch (error) {
        console.error('Error in get profile route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;
