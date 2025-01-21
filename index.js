const express = require('express');
const app = express();
const port = 3010;

// Sample student data
const students = [
    {
        "student_id": "1",
        "name": "Alice Johnson",
        "marks": {
            "math": 85,
            "science": 90,
            "english": 78,
            "history": 88,
            "geography": 92
        },
        "total": 433
    },
    {
        "student_id": "2",
        "name": "Bob Smith",
        "marks": {
            "math": 80,
            "science": 85,
            "english": 75,
            "history": 85,
            "geography": 85
        },
        "total": 410
    },
    {
        "student_id": "3",
        "name": "Charlie Davis",
        "marks": {
            "math": 90,
            "science": 95,
            "english": 85,
            "history": 80,
            "geography": 95
        },
        "total": 445
    },
    {
        "student_id": "4",
        "name": "David Brown",
        "marks": {
            "math": 70,
            "science": 65,
            "english": 68,
            "history": 60,
            "geography": 70
        },
        "total": 333
    }
];

// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint to retrieve students whose total marks exceed the threshold
app.post('/students/above-threshold', (req, res) => {
    const { threshold } = req.body;

    // Input validation for threshold
    if (typeof threshold !== 'number' || isNaN(threshold)) {
        return res.status(400).json({
            error: 'Invalid input. Please provide a valid number for threshold.'
        });
    }

    // Filter students whose total marks exceed the threshold
    const filteredStudents = students.filter(student => student.total > threshold);

    // Respond with the count and the list of students
    res.json({
        count: filteredStudents.length,
        students: filteredStudents.map(student => ({
            name: student.name,
            total: student.total
        }))
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});