'use client';
import React, { useEffect, useState } from 'react';

interface TeamMember {
  _id: string;
  name: string;
  age: string;
}

export default function Home() {
  const [teamMemberName, setTeamMemberName] = useState('');
  const [teamMemberAge, setTeamMemberAge] = useState('');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  // Fetch team members on component mount
  const fetchTeamMembers = async () => {
    try {
      const res = await fetch('/api/team');
      if (!res.ok) {
        throw new Error('Failed to fetch team members');
      }
      const data = await res.json();
      setTeamMembers(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  // Add a new team member
  const handleAddTeamMember = async () => {
    if (!teamMemberName.trim() || !teamMemberAge.trim()) return;
    try {
      const res = await fetch('/api/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: teamMemberName, age: teamMemberAge }),
      });
      if (!res.ok) {
        throw new Error('Failed to add team member');
      }
      const newMember = await res.json();
      setTeamMembers((prev) => [...prev, newMember]);
      setTeamMemberName('');
      setTeamMemberAge('');
    } catch (error) {
      console.error(error);
    }
  };

  // Delete a team member
  const handleDeleteTeamMember = async (id: string) => {
    try {
      const res = await fetch(`/api/team/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        throw new Error('Failed to delete team member');
      }
      setTeamMembers((prev) => prev.filter((member) => member._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        My Workshop Team Members
      </h1>
      <div className="w-full max-w-md bg-white shadow-md rounded px-8 py-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-1">
              Team Member Name:
            </label>
            <input
              id="name"
              type="text"
              value={teamMemberName}
              onChange={(e) => setTeamMemberName(e.target.value)}
              placeholder="Enter name"
              className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label htmlFor="age" className="block text-lg font-medium text-gray-700 mb-1">
              Age:
            </label>
            <input
              id="age"
              type="number"
              value={teamMemberAge}
              onChange={(e) => setTeamMemberAge(e.target.value)}
              placeholder="Enter age"
              className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="button"
            onClick={handleAddTeamMember}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Add Member
          </button>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Current Team Members
          </h2>
          <ul>
            {teamMembers.map((member) => (
              <li
                key={member._id}
                className="p-3 border-b border-gray-200 flex justify-between items-center"
              >
                <div>
                  <span className="font-medium text-gray-700">{member.name}</span> (Age: {member.age})
                </div>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => handleDeleteTeamMember(member._id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}