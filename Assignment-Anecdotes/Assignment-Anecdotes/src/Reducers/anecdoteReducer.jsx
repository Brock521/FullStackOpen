
const input = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const initialState = input.map((value, index) => ({
    id: index,
    anecdote: value,
    votes: 0
  }));

export default function anecdoteReducer(state = initialState, action){

    switch (action.type){
        case  'INCREMENTVOTE':
            //Need to find the anecdote with the right ID, then increment
          
            const updatedAnecdotes = state.map((anecdote) => (
                anecdote.id === action.payload.id ? {...anecdote, votes: anecdote.votes+1} : anecdote
            ));

            return updatedAnecdotes;
        break;
        default:
        return state;
    }

}