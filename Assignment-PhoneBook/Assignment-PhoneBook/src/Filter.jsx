import React, { useState, useEffect } from "react";

const Filter = ({ persons, onDelete }) => {
  // Local state for managing the filter query and the filtered list of names
  const [nameQuery, setNameQuery] = useState("");
  const [queriedNames, setQueriedNames] = useState(persons);

  // Effect to update the filtered list whenever the query or persons change
  useEffect(() => {
    if (nameQuery.trim() === "") {
      setQueriedNames(persons); // If no query, show all persons
    } else {
      setQueriedNames(
        persons.filter((person) =>
          person.name.toLowerCase().includes(nameQuery.toLowerCase())
        )
      );
    }
  }, [nameQuery, persons]);

  return (
    <div>
      <p>
        Filter by name:{" "}
        <input
          value={nameQuery}
          onChange={(event) => setNameQuery(event.target.value)}
          placeholder="Enter name to filter"
        />
      </p>

      {queriedNames.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}{" "}
          <button onClick={() => onDelete(person.id)}>Delete</button>
        </p>
      ))}
    </div>
  );
};

export default Filter;