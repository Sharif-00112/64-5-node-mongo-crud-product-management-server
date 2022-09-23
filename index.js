const express = require('express');
const app = express();
const port = 3099;

const { response } = require('express');

const ObjectId = require('mongodb').ObjectId;

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
    app.get('/products/:id', async(req, res) =>{
      const id = req.params.id;
      const query = {_id: ObjectId(id)};
      const product = await productCollection.findOne(query);

      console.log('Loaded Product with ID', id);
      res.send(product);
    })

    //5. DELETE API (delete single product by id)
    app.delete('/products/:id', async(req, res) =>{
      const id = req.params.id;
      const query = {_id: ObjectId(id)};
      const result = await productCollection.deleteOne(query);

      console.log('deleting product with id: ', result);

      res.json(result);
    })

    //6. DELETE API (delete all products)


    //7. UPDATE API (update single product by id)
    app.put('/products:id', async(req, res)=>{
      const id = req.params.id;
      const updatedProduct = req.body;
      const filter = {_id: ObjectId(id)};
      const options = {upsert: true}; //update+insert = upsert
      const updateDoc = {
        $set: {
          prodTitle: updatedProduct.prodTitle, 
          uom: updatedProduct.uom, 
          color: updatedProduct.color, 
          price: updatedProduct.price, 
          stock: updatedProduct.stock
        }
      }
      const result = await productCollection.updateOne(filter, updateDoc, options);
      console.log('Updated Product', req);
      res.json(result);
    })

    //8. UPDATE API (update all products)


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