function Course({course}){

    return(
      <>
      <Header course={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </>
    );
  }
  
  function Header({course}){
  
    return(
      <div>
        <h1>{course}</h1>
      </div>
    );
  
  }
  
  function Content({parts}){
  
    return(
      <div>
        {  
          parts.map(function(value,index){
             return <Part key={index} partName={value.name} numExercises={value.exercises} />
          })
       }
      </div>
    );
  }
  
  function Part({partName, numExercises}){
  
    return(
      <div>
      <p>
          {partName} {numExercises}
        </p>
      </div>
    );
  }
  
  function Total({parts}){
    
    function getSum(parts){
      var sum;
       sum = parts.reduce((runningValue,value) => {
        runningValue +=value.exercises
        return runningValue;
      },0);
  
      return sum;
    
    }
  
    return(
      <div>
        <p><b> total of  {getSum(parts)} exercises </b></p>
      </div>
  
    );
      
    
  }

  export default Course;