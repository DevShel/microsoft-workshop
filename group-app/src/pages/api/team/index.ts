// group-app\src\pages\api\team\index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getContainer } from '../../../lib/cosmos';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Get client IP for partitioning
  const ipResponse = await fetch("https://api.ipify.org?format=json");
  const { ip: clientIp } = await ipResponse.json();
  
  // Get the container
  const container = getContainer();
  
  if (req.method === 'GET') {
    // Query for all team members with this IP as the partition key
    const querySpec = {
      query: "SELECT * FROM c WHERE c.ipAddress = @ipAddress",
      parameters: [
        {
          name: "@ipAddress",
          value: clientIp
        }
      ]
    };
    
    const { resources: teamMembers } = await container.items.query(querySpec).fetchAll();
    return res.status(200).json(teamMembers);
  } 
  else if (req.method === 'POST') {
    const { name, age } = req.body;
    
    // Create a document for the team member
    const newMember = {
      id: Date.now().toString(), // Use timestamp as ID
      ipAddress: clientIp,       // Use IP as partition key
      name,
      age,
    };
    
    const { resource: createdMember } = await container.items.create(newMember);
    return res.status(201).json(createdMember);
  } 
  else {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}