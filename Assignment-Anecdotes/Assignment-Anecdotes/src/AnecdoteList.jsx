import { useSelector, useDispatch } from 'react-redux'
import { incrementVote } from './Reducers/anecdoteReducer';

function AnecdoteList(){
    
  const anecdotes = useSelector(state=> {
    if (state.filter === "")
      return state.anecdotes
    else{ 
      return state.anecdotes.filter((anecdote) => {
        return anecdote.anecdote.includes(state.filter);
      })
    }});
    const dispatch = useDispatch();
    
    return(      
            anecdotes.toSorted((a, b) => b.votes - a.votes).map((anecdote) => {
              return( 
                <p key={anecdote.id}>
                  {anecdote.anecdote}  
                  <button onClick={()=>dispatch(incrementVote({ id: anecdote.id }))}>Vote</button> 
                  Vote Count: {anecdote.votes}       
              </p>)
            })          
    );
}

export default AnecdoteList;