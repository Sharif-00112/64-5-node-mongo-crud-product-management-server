const express = require('express');
const app = express();
const port = 3001;

const cors = require('cors');

//user: prodManagement1
//pass: jJg4x3Ns8wCk6HCN

//middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://prodManagement1:jJg4x3Ns8wCk6HCN@cluster0.aruppvu.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// Check Connection and error 
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

    //*. create a document to test insert--
    // const productTest = {
    //   prodTitle: 'Mobile', 
    //   uom: 'Pcs',
    //   color: 'Green', 
    //   price: '79000',
    //   stock: 19
    // }
    // const result = await productCollection.insertOne(productTest);
    // console.log(`A document was inserted with the _id: ${result.insertedId}`);


    //1. POST API (insert a single product)
    app.post('/products', async(req, res) => {
      const newProduct = req.body;
      const result = await productCollection.insertOne(newProduct);

      console.log('Got New Product', newProduct);
      console.log('Added New Product', result);

      res.json(result);
    })

    //2. POST API (insert a collection of products)


    //3. GET API (get all products)
    app.get('/products', async(req, res) =>{
      const entryPoint = productCollection.find({});
      const products = await entryPoint.toArray();
      
      res.send(products);
    })

    //4. GET API (get single product by id)


    //5. DELETE API (delete single product by id)


    //6. DELETE API (delete all products)


  } finally {
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello, The Cruel World!');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})