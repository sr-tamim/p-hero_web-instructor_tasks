const express = require('express');
const ObjectId = require('mongodb').ObjectId;
const app = express();
const { MongoClient } = require('mongodb');
require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send(`Cars Zone server is ready at port ${port}`));


const user = process.env.DB_USER;  // mongoDB user
const password = process.env.DB_PASSWORD;  // mongoDB password

const uri = `mongodb+srv://${user}:${password}@cluster0.6ghhv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true }); // mongoDB client

async function run() {
    try {
        // connect mongoDB client
        await client.connect();

        const yoodaHostel = client.db('yoodaHostel');

        // ------------- food management ------------
        const foodsCollection = yoodaHostel.collection('foods')
        // get foods from database
        app.get('/allfoods', async (req, res) => {
            const cursor = foodsCollection.find({});
            const foods = await cursor.toArray();
            res.json(foods);
        })
        // add new food item to database
        app.post('/addfood', async (req, res) => {
            const foodIDs = (await foodsCollection.find({}).toArray()).map(info => info.id)
            const newFoodID = foodIDs.length > 0 ? Math.max(...foodIDs) + 1 : 0
            const newFood = { ...req.body, id: newFoodID }
            const result = await foodsCollection.insertOne(newFood)
            res.json(result)
        })
        // delete a food item from database
        app.delete('/foods/:id', async (req, res) => {
            const { id } = req.params
            const filter = { id: parseInt(id) }
            const result = await foodsCollection.deleteOne(filter)
            res.json(result)
        })

        // -------------------- student management ---------------------
        const studentsCollection = yoodaHostel.collection('students')
        // get students from database
        app.get('/allstudents', async (req, res) => {
            const { pageNo, items } = req.query
            const cursor = await (studentsCollection.find({})).toArray();
            const totalPages = Math.ceil(cursor.length / items)
            const students = cursor.slice((pageNo - 1) * items, pageNo * items);
            res.json([students, totalPages]);
        })
        // add new student to database
        app.post('/addstudent', async (req, res) => {
            const studentIDs = (await studentsCollection.find({}).toArray()).map(info => info.id)
            const newStudentID = studentIDs.length > 0 ? Math.max(...studentIDs) + 1 : 1
            const newStudent = { ...req.body, id: newStudentID }
            const result = await studentsCollection.insertOne(newStudent)
            res.json(result)
        })
        // delete a student from database
        app.delete('/students/:id', async (req, res) => {
            const { id } = req.params
            const filter = { id: parseInt(id) }
            const result = await studentsCollection.deleteOne(filter)
            res.json(result)
        })

    } finally {
        // await client.close();
    }
}

run().catch(console.dir);

app.listen(port, () => console.log(`listening to port => ${port}`));