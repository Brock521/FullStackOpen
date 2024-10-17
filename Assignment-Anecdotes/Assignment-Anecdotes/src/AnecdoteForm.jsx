import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';
import { addAnecdote } from "./Reducers/anecdoteReducer";
import { setNotifMessage } from "./Reducers/notificationReducer";
 function AnecdoteForm(){
    const dispatch = useDispatch();
    const [customAnecdoteEntry,setCustomAnecdoteEntry] = useState("");

    function handleSubmittedEntry(event){

        dispatch(addAnecdote(         
            { id: null, votes: 0, anecdote: customAnecdoteEntry } 
            ))
        
        let notifMessage = "Anecdote Added: ".concat(customAnecdoteEntry);
        dispatch(setNotifMessage(notifMessage))
    }
    
    return (
    <div>
    <strong>Add Anecdote:</strong>
      <input 
        onChange={(event) => setCustomAnecdoteEntry(event.target.value)} 
      />
      <button onClick={handleSubmittedEntry}>
        Add
      </button>
      </div>
    );
}

export default AnecdoteForm;