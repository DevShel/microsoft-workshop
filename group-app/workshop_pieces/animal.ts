async function getRandomAnimal() {
  setAnimalLoading(true);
  
  try {
    const res = await fetch('https://random-animal-api.vercel.app/api/random-animal');
    const data = await res.json();
    const animal = data.animal;
    setCurrentAnimal(animal);
    setAnimalLoading(false);
    return animal;
  } catch (error) {
    console.error('Failed to fetch random animal', error);
    setCurrentAnimal('Unknown Animal');
    setAnimalLoading(false);
    return 'Unknown Animal';
  }
}