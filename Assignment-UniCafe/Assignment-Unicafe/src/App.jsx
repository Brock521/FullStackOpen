import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  function updateFeedBack(feedbackType){

    console.log(feedbackType);
    if(feedbackType === 'Good'){
      setGood((value) => (value + 1));
    }else if(feedbackType === 'Neutral'){
      setNeutral((value) => (value + 1));
    }
    else if(feedbackType === 'Bad'){
      setBad((value) => (value + 1));
    }


  }

  return (
    <div>
      <h2>Give Feedback</h2>
      <Button feedBackType="Good" onClick={() => updateFeedBack("Good")}/>
      <Button feedBackType="Neutral" onClick={() => updateFeedBack("Neutral")}/>
      <Button feedBackType="Bad" onClick={() => updateFeedBack("Bad")}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>

    
  )
}

function Button({feedBackType, onClick}){

  return(
    <button onClick={onClick}>{feedBackType}</button>
  );
}


function Statistics({good,neutral,bad}){
  if (good+neutral+bad === 0){
    return(
      <div>
          <p>No feedback given</p>
      </div>
    );
  }else{
    return(
      <div>


        
       <h2>Statistics</h2>

       <table>
        <thead>
          <tr>
          <th scope="col" align='left'>Type</th>
           <th scope="col" align='left'>Values</th>
        </tr>
        </thead>

        <tbody>
        <tr>
        <StatisticsLine text="Good" value={good} />
        </tr>
        <tr>
        <StatisticsLine text= "Neutral" value={neutral} />
        </tr>
        <tr>
        <StatisticsLine text="Bad" value={bad} />
        </tr>
        <tr>
        <StatisticsLine text="Total Reviews" value={good+bad+neutral}/>
        </tr>
        <tr>
        <StatisticsLine text="Average" value={(good+(-bad))/(good+bad+neutral)}/>
        </tr>
        <tr>
        <StatisticsLine text="Positive(%)" value={(good)/(good+bad+neutral) * 100}/>
        </tr>
        </tbody>

       </table>
     </div>
     
   
   );
  }
}

function StatisticsLine({text, value}){

  return(
    <>
    <th scope="row" align='left'>{text}:</th>
    <td>{value}</td>
    </>
  );
}

export default App