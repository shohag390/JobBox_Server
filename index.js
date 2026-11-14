const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.1cvxqng.mongodb.net/`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // await client.connect();
    // UsersCollection
    const usersCollection = client.db("jobBox").collection("users");
    // JobCollection

    // Users Related Api
    app.post("/user", async (req, res) => {
      const newUser = req.body;
      const result = await usersCollection.insertOne(newUser);
      res.send(result);
    });

    console.log("MongoDB Connected Successfully!");
  } finally {
  }
}
run().catch(console.dir);

// root api
app.get("/", (req, res) => {
  res.send("server working");
});

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
