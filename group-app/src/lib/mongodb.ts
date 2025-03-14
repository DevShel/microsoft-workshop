import { MongoClient } from 'mongodb';

/**
 * This file exports a reusable async function `connectToDatabase` to
 * access your MongoDB database. It uses a global variable to cache
 * the client connection across hot reloads in development.
 */

declare global {
  // Allow global `var` declarations
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI in your .env file');
}

const uri = process.env.MONGODB_URI;
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the client
  // is not re-initialized on hot reloads.
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri!);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, always create a new client.
  client = new MongoClient(uri!);
  clientPromise = client.connect();
}

export async function connectToDatabase() {
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);
  return { client, db };
}

export default connectToDatabase;

