// pages/api/team/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const collectionName = process.env.COLLECTION_NAME || 'defaultCollection';

  try {
    // Call the function to obtain both client and db
    const { db } = await connectToDatabase();
    const collection = db.collection(collectionName);

    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id || Array.isArray(id)) {
        return res.status(400).json({ error: 'A valid ID is required.' });
      }
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Team member not found.' });
      }
      return res.status(200).json({ message: 'Team member deleted successfully.' });
    } else {
      res.setHeader('Allow', ['DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}