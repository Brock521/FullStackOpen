import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react';
import AnecdoteList from './AnecdoteList'
import AnecdoteForm from './AnecdoteForm' 

const App = () => {
 
  return (
    <div>
      <h2>Anecdotes of the day</h2>
       <AnecdoteList/>
       <AnecdoteForm/>
    </div>
  )
}

export default App