const express = require('express');
const app = express();
const port = 3001;

//user: prodManagement1
//pass: jJg4x3Ns8wCk6HCN

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://prodManagement1:jJg4x3Ns8wCk6HCN@cluster0.aruppvu.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

//CRUD Operation
async function run() {
  try {
    await client.connect();
    const database = client.db("productDB");
    const productCollection = database.collection("products");

    // --create a document to test insert--
    // const productTest = {
    //   prodTitle: 'Mobile', 
    //   uom: 'Pcs',
    //   color: 'Green',
    //   price: '79000',
    //   stock: 19
    // }
    // const result = await productCollection.insertOne(productTest);
    // console.log(`A document was inserted with the _id: ${result.insertedId}`);

    //POST API


    //GET API (get all)


    //GET API (get single user by id)


    //DELETE API


  } finally {
    await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Hello, The Cruel World!');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})