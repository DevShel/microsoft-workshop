// pages/api/team/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getContainer } from '../../../lib/cosmos';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check what type of request this is
  if (req.method === 'DELETE') {
    // This is a DELETE request - let's handle it
    
    // Get the user's IP address
    const ipResponse = await fetch("https://api.ipify.org?format=json");
    const { ip: clientIp } = await ipResponse.json();
    
    // Get the team member ID from the URL
    const teamMemberId = req.query.id as string;
    
    // Delete this team member from our database
    await getContainer().item(teamMemberId, clientIp).delete();
    
    // Send back a success message
    return res.status(200).json({ message: 'Team member deleted successfully' });
  } 
}