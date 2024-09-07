import { useEffect, useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));

  function getNextAnecdote(){
    let selectionIndex = parseInt(Math.random(0) * anecdotes.length);

    setSelected(selectionIndex);
  }

  function getHighestVote(){

   var highestIndex = -1;
   var highestValue = -1;
   points.map((values,index) => {
    if(values > highestValue){
      highestIndex = index;
      highestValue = values;
    }
      return highestIndex;  
    });

    return highestIndex;
  }

  function castVote(){
    let arrCopy = points.slice();

    arrCopy[selected] += 1;
    setPoints(arrCopy);
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected] + " "}
       Vote count: {points[selected]}
      <p></p>   
      <button onClick={castVote}>Cast Vote</button>
      <button onClick={getNextAnecdote}>Next Anecdote</button>    
      <h2>Anecdote with the most votes</h2>
      <p>{anecdotes[getHighestVote()]}</p>
    </div>
  )
}

export default App