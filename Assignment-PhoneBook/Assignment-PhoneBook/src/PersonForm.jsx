import React, { useState } from 'react';

const PersonForm = ({ onSubmit }) => {
  // Local state to handle form inputs
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Ensure both fields are filled
    if (name.trim() === '' || number.trim() === '') {
      alert('Please fill in both the name and number fields.');
      return;
    }

    // Call the parent component's onSubmit function with form data
    onSubmit(name, number);

    // Clear the form fields after submission
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name: 
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter name"
          />
        </label>
      </div>
      <div>
        <label>
          Number: 
          <input
            type="text"
            value={number}
            onChange={(event) => setNumber(event.target.value)}
            placeholder="Enter number"
          />
        </label>
      </div>
      <div>
        <button type="submit">Add/Update</button>
      </div>
    </form>
  );
};

export default PersonForm;
