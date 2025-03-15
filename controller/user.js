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

module.exports ={ getAllUsers, createUser};
//2. Signup function


//3. Logout function