
const { Pool } = require('pg');
const ps = require("prompt-sync");
const prompt = ps();

// Connects to the Database in Postgres 
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'assignmentthree',
    password: 'postgres',
    port: 5432,
});

// Retrieves and displays all records from the students table
async function getAllStudents() {
    const query = 'SELECT * FROM students';
    try{
        const result = await pool.query(query);
        console.log(result.rows);
    }
    catch(error){
        console.log("Error retrieving students");
    }
}

//  Inserts a new student record into the students table
async function addStudent(first_name, last_name, email, enrollment_date) {
    const query = 'INSERT INTO students (first_name, last_name, email, enrollment_date) VALUES ($1, $2, $3, $4)';
    const values = [first_name, last_name, email, enrollment_date];

    try{
        await pool.query(query, values);
        console.log("Student Added");
    }
    catch(error){
        console.log("Error adding student");
    }
     
}

//  Updates the email address for a student with the specified student_id
async function updateStudentEmail(student_id, new_email) {
    const query = 'UPDATE students SET email = $1 WHERE student_id = $2';
    const values = [new_email, student_id];

    try{
        await pool.query(query, values);
        console.log('Student Email Updated');
    }
    catch(error){
        console.log("Error updating student email");
    }
}

// Deletes the record of the student with the specified student_id
async function deleteStudent(student_id) {
    const query = 'DELETE FROM students WHERE student_id = $1';
    const values = [student_id];

    try{
        await pool.query(query, values);
        console.log('Student Deleted');
    }
    catch(error){
        console.log("Error deleting student");
    }
 
}

async function menu() {

    console.log("1: getAllStudents()\n2: addStudent()\n3: updateStudentEmail()\n4: deleteStudent()\n5: QUIT");
    input = prompt("Enter number: ");

    while(input != 5){
    
        switch (parseInt(input)){
            case 1:
                await getAllStudents();
                break;
            
            case 2:
                first_name = prompt("Please enter first name: " );
                last_name = prompt("Please enter last name: ");
                email = prompt("Please enter email: ");
                enrollment_date = prompt("Please enter enrollment date (yyyy-mm-dd): ");
                await addStudent(first_name, last_name, email, enrollment_date);
                break;

            case 3:
                student_id = prompt("Enter student id: ");
                new_email = prompt("Enter new email: ");
                await updateStudentEmail(student_id, new_email);
                break;

            case 4:
                student_id = prompt("Enter student id: ");
                await deleteStudent(student_id);
               

        }

        console.log("1: getAllStudents()\n2: addStudent()\n3: updateStudentEmail()\n4: deleteStudent()\n5: QUIT");
        input = prompt("Enter number: ")
    }

}

menu();

