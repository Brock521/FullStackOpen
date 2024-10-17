import { useDispatch } from "react-redux";
import { useState } from 'react';
import { addAnecdote } from "./Reducers/anecdoteReducer";

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
          dispatch(addAnecdote(         
          { id: null, votes: 0, anecdote: customAnecdoteEntry } 
          ))
        }
      >
        Add
      </button>
      </div>
    );
}

export default AnecdoteForm;