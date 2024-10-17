import { useSelector, useDispatch } from 'react-redux'
import { incrementVote } from './Reducers/anecdoteReducer';
import { setNotifMessage } from './Reducers/notificationReducer';
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
    
    function handleVoteSubmit(anecdote){

      dispatch(incrementVote({ id: anecdote.id }));
      
      let notifMessage = "Vote submitted for: ".concat(anecdote.anecdote);
      dispatch(setNotifMessage(notifMessage));

    }

    return(      
            anecdotes.toSorted((a, b) => b.votes - a.votes).map((anecdote) => {
              return( 
                <p key={anecdote.id}>
                  {anecdote.anecdote}  
                  <button onClick={()=>handleVoteSubmit(anecdote)}>Vote</button> 
                  Vote Count: {anecdote.votes}       
              </p>)
            })          
    );
}

export default AnecdoteList;