// App.js
import React from 'react';
import { createStore } from 'redux';
import { Provider, useDispatch, useSelector } from 'react-redux';
import counterReducer from './CounterReducer';

const store = createStore(counterReducer);

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <h2>Give Feedback</h2>
        <FeedbackButtons />
        <FeedbackStatistics />
      </div>
    </Provider>
  );
};

const FeedbackButtons = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <Button feedBackType="Good" onClick={() => dispatch({ type: 'GOOD' })} />
      <Button feedBackType="Neutral" onClick={() => dispatch({ type: 'NEUTRAL' })} />
      <Button feedBackType="Bad" onClick={() => dispatch({ type: 'BAD' })} />
      <Button feedBackType="Reset" onClick={() => dispatch({ type: 'RESET' })} />
    </div>
  );
};

const Button = ({ feedBackType, onClick }) => (
  <button onClick={onClick}>{feedBackType}</button>
);

const FeedbackStatistics = () => {
  const { good, neutral, bad } = useSelector((state) => state);

  const total = good + neutral + bad;
  const average = total > 0 ? (good - bad) / total : 0;
  const positivePercentage = total > 0 ? (good / total) * 100 : 0;

  if (total === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <thead>
          <tr>
            <th align="left">Type</th>
            <th align="left">Values</th>
          </tr>
        </thead>
        <tbody>
          <StatisticsLine text="Good" value={good} />
          <StatisticsLine text="Neutral" value={neutral} />
          <StatisticsLine text="Bad" value={bad} />
          <StatisticsLine text="Total Reviews" value={total} />
          <StatisticsLine text="Average" value={average.toFixed(2)} />
          <StatisticsLine text="Positive (%)" value={`${positivePercentage.toFixed(2)}%`} />
        </tbody>
      </table>
    </div>
  );
};

const StatisticsLine = ({ text, value }) => (
  <tr>
    <th align="left">{text}:</th>
    <td>{value}</td>
  </tr>
);

export default App;