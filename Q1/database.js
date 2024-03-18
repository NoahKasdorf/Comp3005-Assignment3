// Import required modules
const { Pool } = require('pg');

const poolOne = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'postgres',
    port: 5432,
});

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'assignmentthree',
    password: 'postgres',
    port: 5432,
});

async function createAndIntializeDatabase() {

    try{
        await poolOne.query('CREATE DATABASE AssignmentThree');
        console.log("Database Created");
    }
    catch{
        console.log("Error creating database");
    }
    
    const table = ` CREATE TABLE IF NOT EXISTS students (
      student_id SERIAL PRIMARY KEY,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      enrollment_date DATE)`;
    
    try{
        await pool.query(table);
        console.log('Table created');
    }
    catch{
        console.log("Table already exists");
    }

    const data = ` INSERT INTO students (first_name, last_name, email, enrollment_date) VALUES 
    ('John', 'Doe', 'john.doe@example.com', '2023-09-01'),
    ('Jane', 'Smith', 'jane.smith@example.com', '2023-09-01'),
    ('Jim', 'Beam', 'jim.beam@example.com', '2023-09-02')`;
    
    try{
        await pool.query(data);
        console.log('Data inserted');
    }
    catch{
        console.log("Data NOT inserted")
    }
    
}

createAndIntializeDatabase();