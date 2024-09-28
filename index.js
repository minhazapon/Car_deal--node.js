const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000


console.log(process.env.DB_USERS)
console.log(process.env.DB_PASS)

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
  res.send(' Car Deal Server ')
})
  

////////////////mongoDB///////////
  


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USERS}:${process.env.DB_PASS}@cluster0.ruz4b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection

    //crud//

    const carCollection = client.db('carDB').collection('carData')

    //create//
      
    app.post('/carData',  async(req, res) => {
      
         const carData = req.body 
         console.log(carData) 
         const result = await carCollection.insertOne(carData)
         res.send(result)
  
    })

    //create//


    //read//

    app.get('/carData',  async(req, res) => {
      
      const cursor = carCollection.find(); 
      const result = await cursor.toArray()
      res.send(result)

    })

    //read//


    //delete//
      
    app.delete('/carData/:id',  async(req, res) => {
      
       const id = req.params.id 
       const query = { _id: new ObjectId(id) }
       const result = await carCollection.deleteOne(query)
       res.send(result)

    })
    
    //delete//


    //update//
      
 
    app.get('/carData/:id',  async(req, res) => {
      
      const id = req.params.id 
      const query = { _id: new ObjectId(id) }
      const result = await carCollection.findOne(query) 
      res.send(result)

   })


    app.put('/carData/:id',  async(req, res) => {
      
     
          const id = req.params.id 
          const UpUsers = req.body 
          console.log(id, UpUsers)
          const filter = { _id: new ObjectId(id) }
          const option = {upsert: true}
          const upDtUsers = req.body
          const Carz = {
             
            $set: {

              name: upDtUsers.name ,
              photourl: upDtUsers.photourl,
              brand: upDtUsers.brand,
              price: upDtUsers.price,
              category: upDtUsers.category,
              description: upDtUsers.description,
             


            }

          }

          const result = await carCollection.updateOne(filter, Carz,  option)
          res.send(result)

 
   })  

 
 
    //update//



    //crud//


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.log);


 

 





////////////////mongoDB///////////

app.listen(port, () => {
  console.log(`Car Deal Server port >>> ${port}`)
})