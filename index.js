const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { yellow } = require('colors');
require('dotenv').config();
require("colors"); //optional
const app = express();
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.mpr3cem.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        console.log('Database connected'.yellow.italic);

        const productCollection = client.db("crudMongoDbRecup").collection("products");
        const userCollection = client.db("crudMongoDbRecup").collection("users");

        productCollection.insertOne({ name: 'Pizza' });
    }
    catch (error) {
        // console.log(error.name, error.message, error.stack);
        console.log(error.name.bgRed, error.message.bold, error.stack);
    }
}
run();



app.get('/', (req, res) => {
    res.send('crud mongoDB recup server running');
})

app.listen(port, () => {
    console.log(`mongoDB server running on port: ${port}`.cyan.bold);
})