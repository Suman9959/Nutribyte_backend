const {pool} = require('../middleware/databaseConnection');

//1. Login function

async function getAllUsers(){
    //get all users from the database
    try{ 
        const result = await pool.query('SELECT * FROM users');
        console.table(result.rows);
       
        return {status: 200, data: result.rows};            
    } catch (error) {
        return {status: 500, data: error};
    }
}

module.exports ={ getAllUsers};
//2. Signup function


//3. Logout function