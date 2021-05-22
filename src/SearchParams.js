import React, { useState, useEffect, useContext } from 'react';
import Results from './Results';
import ThemeContext from './ThemeContext';
import useBreedList from './useBreedList';

const ANIMALS = ['cat', 'bird', 'dog', 'rabbit', 'reptile'];

const SearchParams = () => {
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([]);
  const [breeds] = useBreedList(animal);
  const [ theme, setTheme ] = useContext(ThemeContext);

  const requestPets = async () => {
    const res = await fetch(`http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`);
    const data = await res.json();
    setPets(data.pets);
  };

  useEffect(() => {
    requestPets();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = ev => {
    ev.preventDefault();
    requestPets();
  }

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  }

  return (
    <div
      className="my-0 mx-auto w-11/12">
      <form className="p-10 mb-10 rounded-lg bg-gray-200 shadow-lg flex flex-col justify-center items-center divide-y divide-gray-900" action="" onSubmit={handleSubmit}>
        <label htmlFor="location" className="search-label">
          Location
          <input
            type="text"
            name="location"
            className="search-control"
            id="location"
            value={location}
            placeholder="Location..."
            onChange={e => setLocation(e.target.value)}
          />
        </label>
        <label htmlFor="animal" className="search-label">
          Animal
          <select
            name="animal"
            className="search-control"
            id="animal"
            value={animal}
            onChange={e => setAnimal(e.target.value)}
            onBlur={e => setAnimal(e.target.value)}
          >
            <option value="">Select an animal</option>
            {
              ANIMALS.map(animal => <option value={animal} key={animal}>{animal}</option>)
            }
          </select>
        </label>
        <label htmlFor="breed" className="search-label">
          Breed
          <select
            name="breed"
            id="breed"
            className="search-control disabled:opacity-50"
            disabled={!breeds.length}
            value={breed}
            onChange={e => setBreed(e.target.value)}
            onBlur={e => setBreed(e.target.value)}
          >
            <option value="">Select an breed</option>
            {
              breeds.map(breed => <option value={breed} key={breed}>{breed}</option>)
            }
          </select>
        </label>
        <label htmlFor="theme" className="search-label">
          Theme
          <select
            name="theme"
            id="theme"
            className="search-control"
            onChange={handleThemeChange}
            onBlur={handleThemeChange}
          >
            <option value="#000">Dark</option>
            <option value="#eee">Light</option>
          </select>
        </label>
        <button className="rounded px-6 py-2 text-white hover:opacity-50 border-none" style={{backgroundColor: theme }}>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
