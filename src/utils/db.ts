import { MongoClient } from 'mongodb';

export interface Env {
  AI: any;
}

export async function push(
  userId_: string,
  message_: string,
  response_: string
) {
  // export async function GET(req: NextRequest) {
  // Replace the uri string with your MongoDB deployment's connection string.
  const uri =
    'mongodb+srv://ji19283756:16Bp00UEYrv7A7vCANx9@cluster0.3ztx48o.mongodb.net/?retryWrites=true&w=majority';

  // Create a new client and connect to MongoDB
  const client = new MongoClient(uri);
  try {
    // Connect to the "insertDB" database and access its "haiku" collection
    const database = client.db('cluster0');
    const people = database.collection('people');

    // Create a document to insert
    const doc = {
      userId: userId_,
      message: message_,
      response: response_,
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

export async function pull(user_id: string) {
  // export async function GET(req: NextRequest) {
  // Replace the uri string with your MongoDB deployment's connection string.
  const uri =
    'mongodb+srv://ji19283756:16Bp00UEYrv7A7vCANx9@cluster0.3ztx48o.mongodb.net/?retryWrites=true&w=majority';

  // Create a new client and connect to MongoDB
  const client = new MongoClient(uri);
  try {
    // Connect to the "insertDB" database and access its "haiku" collection
    const database = client.db('cluster0');
    const people = database.collection('people');

    // Query for movies that have a runtime less than 15 minutes
    const query = { userId: { $eq: user_id } };

    var questions = [];

    const options = {
      projection: { _id: 1, userId: 1, message: 1, response: 1 },
    };

    // Execute query
    const cursor = people.find(query, options);

    // Print a message if no documents were found
    if ((await people.countDocuments(query)) === 0) {
      console.log('No documents found!');
    }

    // Print returned documents
    for await (const doc of cursor) {
      questions.push(doc);
    }
  } finally {
    // Close the MongoDB client connection
    await client.close();
    console.dir(questions);
    return questions;
  }
}
