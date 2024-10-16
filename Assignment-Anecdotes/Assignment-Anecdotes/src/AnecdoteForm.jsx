import { useDispatch } from "react-redux";
import { useState } from 'react';

 function AnecdoteForm(){
    const dispatch = useDispatch();
    const [customAnecdoteEntry,setCustomAnecdoteEntry] = useState("");

    return (
    <div>
    <strong>Add Anecdote:</strong>
      <input 
        onChange={(event) => setCustomAnecdoteEntry(event.target.value)} 
      />
      <button 
        onClick={() =>  
          dispatch({ 
            type: 'ADD_ANECDOTE', 
            payload: { id: null, votes: 0, anecdote: customAnecdoteEntry } 
          })
        }
      >
        Add
      </button>
      </div>
    );
}

export default AnecdoteForm;