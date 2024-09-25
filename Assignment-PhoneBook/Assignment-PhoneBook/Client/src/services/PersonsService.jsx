import axios from 'axios';
const baseURL = 'http://localhost:3031/PhoneBook/Api';

// Fetch all persons from the server
function getAll() {
    console.log("Fetching all persons...");
    return axios.get(baseURL).then((response) => {
        console.log("Fetched all persons:", response.data);
        return response.data;  // Return the list of persons
    });
}

// Create a new person entry
function create(newEntry) {
    return axios.post(baseURL, newEntry).then((response) => {
        console.log("Created new entry with status:", response.status);
        return response.data;  // Return the created entry data
    });
}

// Update an existing person entry by ID
function update(id, newEntry) {
    return axios.put(`${baseURL}/${id}`, newEntry).then((response) => {
        console.log("Updated entry with status:", response.status);
        return response.data;  // Return the updated entry data
    });
}

// Delete a person entry by ID
function deleteEntry(id) {
    return axios.delete(`${baseURL}/${id}`).then((response) => {
        console.log("Deleted entry with status:", response.status);
        return response.data;  // Return the server response (usually empty)
    });
}

export default { getAll, create, update, deleteEntry };