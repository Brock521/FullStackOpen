import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';
import CountryList from './CountryList';

/*Uses API from https://studies.cs.helsinki.fi/restcountries/ */

function App() {
  
  const [countryData,setCountryData] = useState(null);

  useEffect(()=>{
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').then((response)=>{
     setCountryData(response.data);
    });

  },[]);

  
  
  return (
    <>     
      {
        <CountryList countryData={countryData}/>
        
        
      }
    </>
  )
}

export default App
