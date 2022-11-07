const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { yellow } = require('colors');
const res = require('express/lib/response');
require('dotenv').config();
require("colors"); //optional
const app = express();
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.mpr3cem.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function runDbConnect() {
    try {
        await client.connect();
        console.log('Database connected'.yellow.italic);
    }
    catch (error) {
        console.log(error.name.bgRed, error.message.bold, error.stack);
    }
}
runDbConnect();


const productCollection = client.db("crudMongoDbRecup").collection("products");
const userCollection = client.db("crudMongoDbRecup").collection("users");

// Create Operation: endPoint user heat korbe then data db te load hobe
app.post('/product', async (req, res) => {
    try {
        const result = await productCollection.insertOne(req.body);
        if (result.insertedId) {
            res.send({
                success: true,
                message: `Successfully created the ${req.body.name} product with id ${result.insertedId}`
            });
        }
        else {
            res.send({
                success: false,
                message: "Couldn't create the product"
            });
        }
    }
    catch (error) {
        console.log(error.name.bgRed, error.message.bold);
        res.send({
            success: false,
            error: error.message
        });
    }

});



// Basic server initial setup
app.get('/', (req, res) => {
    res.send('crud mongoDB recup server running');
})

app.listen(port, () => {
    console.log(`mongoDB server running on port: ${port}`.cyan.bold);
})