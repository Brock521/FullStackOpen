import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react';
const App = () => {
  const anecdotes = useSelector(state=>state);
  const dispatch = useDispatch();

  const [customAnecdoteEntry, setCustomAnecdoteEntry] = useState("");

  return (
    <div>
      <h2>Anecdotes of the day</h2>
       
      {
      anecdotes.map((anecdote) => {
        return( 
          <p key={anecdote.id}>
            {anecdote.anecdote}  
            <button onClick={()=>dispatch({ type: 'INCREMENT_VOTE', payload: { id: anecdote.id } })}>Vote</button> 
            Vote Count: {anecdote.votes}       
        </p>)
      })
      }

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
      <h2>Anecdote with the most votes</h2>
    </div>
  )
}

export default App