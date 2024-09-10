import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';
import CountryList from './CountryList';

/*Uses API from https://studies.cs.helsinki.fi/restcountries/ 
https://fullstackopen.com/en/part2/adding_styles_to_react_app#exercises-2-16-2-17
As outlined in the assignment there are some edge cases where some countries have simlar names so more filtering would be requried
such as Sudan and South Sudan. No all functionality will work for these countries at the moment as it is not required.

*/

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
