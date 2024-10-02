import { useEffect, useState } from 'react';
import PersonForm from './PersonForm.jsx';
import Filter from './Filter.jsx';
import PersonsService from './services/PersonsService.jsx';
import Notification from './Notification.jsx';


const App = () => {
  const [persons, setPersons] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState(null);

  // Function to handle the form submission
  async function handleSubmit(name, phoneNumber) {
      console.log('In App-handleSubmit');

      // Check if the name already exists and get its ID
      let existingEntryID = getExistingEntryID(name);
      console.log("Existing Entry ID:", existingEntryID);

      if (existingEntryID === undefined) {
        // If the name does not exist, add a new entry
        await addEntry(name, phoneNumber); // Use await to wait for the async operation to complete
      } else {
        // If the name exists, update the existing entry
        await updateEntry(name, phoneNumber, existingEntryID); // Ensure this also completes before moving on
      }

      try {
        // Fetch the updated list from the server
        const data = await PersonsService.getAll();
        console.log('Fetched persons from server:', data);
        setPersons(data); // Update the state with the new data
      } catch (error) {
        console.error('Failed to fetch persons:', error);
      }

      console.log('Finished handleSubmit function');
  }

  // Function to add a new entry
  async function addEntry(name, phoneNumber) {

    console.log('In App-addEntry');
    if (!persons.some((person) => person.name === name)) {
      let entry = { name: name, phoneNumber: phoneNumber };
      await PersonsService.create(entry)
        .then((createdPerson) => {
          // Update the state with the new person data from the server
          console.log("Entered Info:",name,phoneNumber);
          console.log("Created new entry with status:", createdPerson.name, createdPerson.phoneNumber);
          setPersons((prevPersons) => [...prevPersons, createdPerson]);

          let notificationMessage = "Entry was added successfully: " + createdPerson.name;
          setNotificationMessage(notificationMessage);
          setTimeout(()=>{
            setNotificationMessage(null);
          },3000);

        })
        .catch((error) => {
          console.error('Failed to create entry:', error);
        });
    }
  }

  // Function to delete an entry
  async function deleteEntry(id) {
    const foundEntry = persons.find((entry) => entry.id === id);

    if (foundEntry) {
      let confirmation = window.confirm(
        'Would you like to remove this entry: '.concat(foundEntry.name)
      );
      if (confirmation) {
        await PersonsService.deleteEntry(id)
          .then(() => {
            // Fetch the updated list of persons after deletion
            return PersonsService.getAll();
          })
          .then((data) => {

            setPersons(data); // Update state with the new list of persons

            let notificationMessage = "Entry was deleted successfully";
            setNotificationMessage(notificationMessage);
            setTimeout(()=>{
              setNotificationMessage(null);
            },3000);

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
  async function updateEntry(name, phoneNumber, id) {

    console.log('In App-update Entry for id: ' + id);
    const entryToUpdate = persons.find((person) => person.name === name);

    let confirmation = window.confirm(
      `A person with this number already exists. Would you like to replace the existing number with the new one? ${entryToUpdate.name}: ${entryToUpdate.phoneNumber}`
    );

    if (confirmation) {
      console.log('Updating number');
      await PersonsService.update(id, { name, phoneNumber })
        .then((updatedPerson) => {
          // Update the state after a successful update
          setPersons((prevPersons) =>
            prevPersons.map((person) => (person.id !== id ? person : updatedPerson))
          );

          let notificationMessage = "Entry was updated successfully: " + updatedPerson.name + " " + updatedPerson.phoneNumber;
          setNotificationMessage(notificationMessage);
          setTimeout(()=>{
            setNotificationMessage(null);
          },3000);
        })
        .catch((error) => {
          console.error('Failed to update entry :', error);
          let notificationMessage = 'Failed to update entry:' + entryToUpdate.name + " " + entryToUpdate.phoneNumber + ". Entry was already removed from the server.";
          setNotificationMessage(notificationMessage);
          setNotificationType('error');
          setTimeout(()=>{
            setNotificationMessage(null);
            setNotificationType(null);
          },3000);

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
    const fetchData = async () => {
      try {
        const data = await PersonsService.getAll();
        setPersons(data);
      } catch (error) {
        console.error('Failed to fetch persons:', error);
        setNotificationMessage('Failed to fetch persons. Please try again later.');
        setNotificationType('error');
        setTimeout(() => {
          setNotificationMessage(null);
          setNotificationType(null);
        }, 3000);
      }
    };
  
    fetchData();
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message = {notificationMessage} notifType={notificationType}/>
      <PersonForm onSubmit={handleSubmit} />
      <h2>Numbers</h2>
      <Filter persons={persons} onDelete={deleteEntry} />
    </div>
  );
};

export default App;
