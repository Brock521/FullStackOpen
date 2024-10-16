import { useSelector, useDispatch } from 'react-redux'
 
function AnecdoteList(){
    
  const anecdotes = useSelector(state=>state);
    const dispatch = useDispatch();
    
    return(      
            anecdotes.toSorted((a, b) => b.votes - a.votes).map((anecdote) => {
              return( 
                <p key={anecdote.id}>
                  {anecdote.anecdote}  
                  <button onClick={()=>dispatch({ type: 'INCREMENT_VOTE', payload: { id: anecdote.id } })}>Vote</button> 
                  Vote Count: {anecdote.votes}       
              </p>)
            })          
    );
}

export default AnecdoteList;