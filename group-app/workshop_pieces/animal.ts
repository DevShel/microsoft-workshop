// Function to fetch a random animal
async function getRandomAnimal() {
    try {
      const res = await fetch('https://random-animal-api.vercel.app/api/random-animal');
      const data = await res.json();
      return data.name; // BUG: This should be data.animal, not data.name
    } catch (error) {
      console.error('Failed to fetch random animal', error);
      return 'Unknown Animal';
    }
  }
  