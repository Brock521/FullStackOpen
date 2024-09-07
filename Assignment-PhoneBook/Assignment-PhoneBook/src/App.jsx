import { useEffect, useState } from 'react';
import PersonForm from './PersonForm.jsx';
import Filter from './Filter.jsx';
import PersonsService from './services/PersonsService.jsx';

const App = () => {
  const [persons, setPersons] = useState([]);

  // Function to handle the form submission
  function handleSubmit(name, number) {
  
    console.log('In App-handleSubmit');

    // Check if the name already exists and get its ID
    let existingEntryID = getExistingEntryID(name);
    console.log(existingEntryID);

    if (existingEntryID === undefined) {
      // If the name does not exist, add a new entry
      addEntry(name, number);
    } else {
      // If the name exists, update the existing entry
      updateEntry(name, number, existingEntryID);
    }

    // Fetch the updated list from the server
    PersonsService.getAll()
      .then((data) => {
        setPersons(data); // Directly use the data since getAll already returns response.data
      })
      .catch((error) => {
        console.error('Failed to fetch persons:', error);
      });
  }

  // Function to add a new entry
  function addEntry(name, number) {
    if (!persons.some((person) => person.name === name)) {
      let entry = { name: name, number: number };
      PersonsService.create(entry)
        .then((createdPerson) => {
          // Update the state with the new person data from the server
          setPersons((prevPersons) => [...prevPersons, createdPerson]);
        })
        .catch((error) => {
          console.error('Failed to create entry:', error);
        });
    }
  }

  // Function to delete an entry
  function deleteEntry(id) {
    const foundEntry = persons.find((entry) => entry.id === id);

    if (foundEntry) {
      let confirmation = window.confirm(
        'Would you like to remove this entry: '.concat(foundEntry.name)
      );
      if (confirmation) {
        PersonsService.deleteEntry(id)
          .then(() => {
            // Fetch the updated list of persons after deletion
            return PersonsService.getAll();
          })
          .then((data) => {
            setPersons(data); // Update state with the new list of persons
          })
          .catch((error) => {
            console.error('Failed to delete entry:', error);
          });
      }
    } else {
      console.log('Entry not found');
    }
  }

  // Function to update an entry
  function updateEntry(name, number, id) {
    const entryToUpdate = persons.find((person) => person.name === name);

    let confirmation = window.confirm(
      `A person with this number already exists. Would you like to replace the existing number with the new one? ${entryToUpdate.name}: ${entryToUpdate.number}`
    );

    if (confirmation) {
      console.log('Updating number');
      PersonsService.update(id, { name, number })
        .then((updatedPerson) => {
          // Update the state after a successful update
          setPersons((prevPersons) =>
            prevPersons.map((person) => (person.id !== id ? person : updatedPerson))
          );
        })
        .catch((error) => {
          console.error('Failed to update entry:', error);
        });
    }
  }

  // Function to get the ID of an existing entry by name
  function getExistingEntryID(name) {
    let person = persons.find((person) => person.name === name);
    if (person !== undefined) {
      return person.id;
    }
  }

  // Effect hook to fetch the initial list of persons from the server
  useEffect(() => {
    PersonsService.getAll()
      .then((data) => {
        setPersons(data); // Directly use the data since getAll already returns response.data
      })
      .catch((error) => {
        console.error('Failed to fetch persons:', error);
      });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm onSubmit={handleSubmit} />
      <h2>Numbers</h2>
      <Filter persons={persons} onDelete={deleteEntry} />
    </div>
  );
};

export default App;
