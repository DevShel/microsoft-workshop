// pages/api/team/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getContainer } from '../../../lib/cosmos';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    res.setHeader('Allow', ['DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  
  // Get IP for partitioning
  const ipResponse = await fetch("https://api.ipify.org?format=json");
  const { ip: clientIp } = await ipResponse.json();
  
  // Get team member ID to delete
  const teamMemberId = req.query.id as string;
  
  // Delete the document directly by ID and partition key
  await getContainer().item(teamMemberId, clientIp).delete();
  
  return res.status(200).json({ message: 'Team member deleted successfully' });
}