import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux'
import App from './App'
import anecdoteSlice from './Reducers/anecdoteReducer';
import anecdoteFilterSlice from './Reducers/anecdoteFilterReducer';
import notificationSlice from './Reducers/notificationReducer';

//Configure store
const store = configureStore({
  reducer:{
    anecdotes: anecdoteSlice,
    filter: anecdoteFilterSlice,
    notification: notificationSlice
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)