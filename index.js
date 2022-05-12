const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000
require('dotenv').config()



//middleware 
app.use(cors())
app.use(express.json())

//connecting mongodb


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mkisq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

//using async function
async function run() {
    try {
        await client.connect();
        const collection = client.db('dbWarehouse').collection('products');

        app.get('/products', async (req, res) => {
            const query = {};
            const cursor = collection.find(query)
            const result = await cursor.toArray()
            res.send(result)


        })
        //updating database
        app.get('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const data = await collection.findOne(query)

            res.send(data)

        })
        //adding data from client
        app.post('/products', async (req, res) => {
            const newProduct = req.body;
            const result = await collection.insertOne(newProduct);
            res.send(result)
        })

        //Deleting data
        app.delete('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await collection.deleteOne(query)
            res.send(result)
        })
        //for stock button
        app.put('/products/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const options = { upsert: true };
            const updated = req.body;

            const updateDoc = {
                $set: {
                    quantity: parseInt(updated.quantity)
                },
            }

            const result = await collection.updateOne(filter, updateDoc, options);
            res.send(result)


        })

        //for deliver button
        app.put('/products/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const options = { upsert: true };
            const updated = req.body;

            const updateDoc = {
                $set: {
                    quantity: parseInt(updated.quantity)
                },
            }

            const result = await collection.updateOne(filter, updateDoc, options);
            res.send(result)

        })

        //updating data from inserted field
        app.put('/products/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const options = { upsert: true };
            const updated = req.body;

            const updateDoc = {
                $set: {
                    quantity: parseInt(updated.quantity)
                },
            }

            const result = await collection.updateOne(filter, updateDoc, options);
            res.send(result)

        })
        //getting data with email
        app.get('/products/:email', async (req, res) => {
            const email = req?.query?.email
            const query = {"email":email}
            const cursor = collection.find(query);
            const result = await cursor.toArray();
            res.send(result)
        })
    }

    finally {

    }
}
run().catch(console.dir)



app.get('/', (req, res) => {
    res.send('Running the server')
})
app.listen(port, () => {
    console.log('Listening to port', port)
})