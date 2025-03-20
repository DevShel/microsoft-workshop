'use client';

import React, { useEffect, useState } from 'react';

interface TeamMember {
  id: string;
  name: string;
  age: string | number;
  ipAddress: string;
}

export default function Home() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [teamMemberName, setTeamMemberName] = useState('');
  const [teamMemberAge, setTeamMemberAge] = useState('');
  const [loading, setLoading] = useState(true);

  // Load team members on component mount
  useEffect(() => {
    loadTeamMembers();
  }, []);

  // INSERT GET RANDOM ANIMAL HERE

  // Function to load team members
  async function loadTeamMembers() {
    setLoading(true);
    
    const res = await fetch('/api/team');
    const data = await res.json();
    setTeamMembers(data);
    
    setLoading(false);
  }

  // Add a new team member
  async function addTeamMember() {
    if (!teamMemberName.trim() || !teamMemberAge.trim()) return;
    
    setLoading(true);
    
    const res = await fetch('/api/team', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: teamMemberName,
        age: teamMemberAge,
      }),
    });
    
    const newMember = await res.json();
    setTeamMembers(prev => [...prev, newMember]);
    setTeamMemberName('');
    setTeamMemberAge('');
    
    setLoading(false);
  }

  // Delete a team member
  async function deleteTeamMember(id: string) {
    setLoading(true);
    
    await fetch(`/api/team/${id}`, {
      method: 'DELETE',
    });
    
    setTeamMembers(prev => prev.filter(m => m.id !== id));
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">My Workshop Team Members</h1>

      <div className="w-full max-w-md bg-white shadow-md rounded px-8 py-6">
        <div className="space-y-4">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-1">Team Member Name:</label>
            <input
              type="text"
              value={teamMemberName}
              onChange={(e) => setTeamMemberName(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-1">Age:</label>
            <input
              type="number"
              value={teamMemberAge}
              onChange={(e) => setTeamMemberAge(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
              disabled={loading}
            />
          </div>
          <button
            className={`w-full text-white font-semibold py-2 rounded ${
              loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
            }`}
            onClick={addTeamMember}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Add Member'}
          </button>
        </div>

        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">Current Team Members</h2>
            <button 
              onClick={loadTeamMembers}
              className="text-blue-500 text-sm hover:underline"
              disabled={loading}
            >
              Refresh
            </button>
          </div>
          
          {loading ? (
            <p className="text-gray-500 text-center py-4">Loading team members...</p>
          ) : teamMembers.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No team members added yet.</p>
          ) : (
            <ul>
              {teamMembers.map(m => (
                <li key={m.id} className="p-3 border-b border-gray-200 flex justify-between items-center">
                  <div>
                    <span className="font-medium text-gray-700">{m.name}</span> (Age: {m.age})
                  </div>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => deleteTeamMember(m.id)}
                    disabled={loading}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}