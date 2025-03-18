const {pool} = require('../middleware/databaseConnection');

//1. Login function

async function getAllUsers(){
    //get all users from the database
    try{ 
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [15]);  
        console.table(result.rows);
       
        return {status: 200, data: result.rows};            
    } catch (error) {
        return {status: 500, data: error};
    }
}
async function createUser(userData) {
    const {firstName, lastName, age, weight, height} = userData;
    try {
        const result = await pool.query('INSERT INTO users (first_name, last_name, age, weight, height) VALUES ($1, $2, $3, $4, $5)', [firstName, lastName, age, weight, height]);
        return {status: 200, data: result.rows};
    } catch (error) {
        return {status: 500, data: error};
    }
}


//

async function createOrUpdateProfile(userId, profileData) {
    const { age, weight, height, goal, activityLevel, dietaryRestrictions } = profileData;
    
    try {
        // Check if user already has a profile
        const existingProfile = await pool.query(
            'SELECT * FROM user_profiles WHERE user_id = $1',
            [userId]
        );
        
        if (existingProfile.rows.length > 0) {
            // Update existing profile
            const updatedProfile = await pool.query(
                `UPDATE user_profiles 
                 SET age = $1, weight = $2, height = $3, goal = $4, activity_level = $5, dietary_restrictions = $6
                 WHERE user_id = $7
                 RETURNING *`,
                [age, weight, height, goal, activityLevel, dietaryRestrictions || '{}', userId]
            );
            
            return { 
                status: 200, 
                data: updatedProfile.rows[0],
                message: 'Profile updated successfully'
            };
        }
        
        // Create new profile
        const newProfile = await pool.query(
            `INSERT INTO user_profiles (user_id, age, weight, height, goal, activity_level, dietary_restrictions)
             VALUES ($1, $2, $3, $4, $5, $6, $7)
             RETURNING *`,
            [userId, age, weight, height, goal, activityLevel, dietaryRestrictions || '{}']
        );
        
        return {
            status: 201,
            data: newProfile.rows[0],
            message: 'Profile created successfully'
        };
    } catch (error) {
        console.error('Error creating/updating profile:', error);
        return { status: 500, data: error, message: 'Internal server error' };
    }
}




async function getUserProfile(userId) {
    try {
        const profile = await pool.query(
            'SELECT * FROM user_profiles WHERE user_id = $1',
            [userId]
        );
        
        return {
            status: 200,
            data: profile.rows[0] || null,
            hasProfile: profile.rows.length > 0
        };
    } catch (error) {
        console.error('Error fetching profile:', error);
        return { status: 500, data: error, message: 'Internal server error' };
    }
}


module.exports ={ getAllUsers, createUser, createOrUpdateProfile, getUserProfile};
//2. Signup function


//3. Logout function

















