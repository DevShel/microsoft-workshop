// pages/api/team/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const collectionName = process.env.COLLECTION_NAME || 'defaultCollection';

  try {
    // Call the function to obtain both client and db
    const { db } = await connectToDatabase();
    const collection = db.collection(collectionName);

    if (req.method === 'GET') {
      // Fetch all team members
      const teamMembers = await collection.find({}).toArray();
      return res.status(200).json(teamMembers);
    } else if (req.method === 'POST') {
      // Add a new team member
      const { name, age } = req.body;
      if (!name || !age) {
        return res.status(400).json({ error: 'Name and age are required.' });
      }
      const result = await collection.insertOne({ name, age });
      return res.status(201).json({ _id: result.insertedId, name, age });
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}