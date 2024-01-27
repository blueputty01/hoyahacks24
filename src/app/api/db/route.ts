import { MongoClient } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

export interface Env {
  AI: any;
}

export async function GET(req: NextRequest) {
  // Replace the uri string with your MongoDB deployment's connection string.
  const uri =
    'mongodb+srv://ji19283756:16Bp00UEYrv7A7vCANx9@cluster0.3ztx48o.mongodb.net/?retryWrites=true&w=majority';

  // Create a new client and connect to MongoDB
  const client = new MongoClient(uri);

  async function run() {
    try {
      // Connect to the "insertDB" database and access its "haiku" collection
      const database = client.db('cluster0');
      const people = database.collection('people');

      // Create a document to insert
      const doc = {
        userId: '0',
        message: 'How can I improve cyber security in my home?',
      };
      // Insert the defined document into the "haiku" collection
      const result = await people.insertOne(doc);

      // Print the ID of the inserted document
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {
      // Close the MongoDB client connection
      await client.close();
    }
  }
  // Run the function and handle any errors
  run().catch(console.dir);

  return NextResponse.json({
    message: 'Hello from the API!',
  });
}
