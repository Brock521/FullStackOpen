import AnecdoteList from './AnecdoteList'
import AnecdoteForm from './AnecdoteForm' 
import Filter from './Filter';
import Notification from './Notification';
const App = () => {
 
  return (
    <div>
      <Notification/>
      <h2>Anecdotes of the day</h2>
       <Filter/>
       <AnecdoteList/>
       <AnecdoteForm/>
    </div>
  )
}

export default App