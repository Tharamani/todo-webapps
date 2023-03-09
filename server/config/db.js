const { MongoClient } = require('mongodb');
const dotenv = require('dotenv')

dotenv.config() // loads .env file contents into process.env

const mongoDbUrl = process.env.MONGO_DB_URl || "";
let client =  new MongoClient(mongoDbUrl , { monitorCommands: true });

const connectDb = async () =>{
  try {

    client =  await new MongoClient(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    console.log("Connected successfully to server");
  } catch(e) {
    console.error(e);
  }finally{
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

// const getDb = () => connection

module.exports = { connectDb, client}