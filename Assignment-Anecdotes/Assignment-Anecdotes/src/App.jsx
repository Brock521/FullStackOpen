import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const anecdotes = useSelector(state=>state);
  const dispatch = useDispatch();


  return (
    <div>
      <h2>Anecdotes of the day</h2>
       
      {
      anecdotes.map((anecdote) => {
        return( 
          <p key={anecdote.id}>
            {anecdote.anecdote}  
            <button onClick={()=>dispatch({ type: 'INCREMENTVOTE', payload: { id: anecdote.id } })}>Vote</button> 
            Vote Count: {anecdote.votes}       
        </p>)
      })
      }


      <h2>Anecdote with the most votes</h2>
    </div>
  )
}

export default App