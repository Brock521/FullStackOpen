import { useState } from "react";
import Country from './Country'

export default function CountryList({countryData}){
    const [activeCountries, setActiveCountries] = useState([]);

    function showFilteredCountries(event){

        if(!countryData){
          console.log("Country data not available");
          return;
        }
    
        let countryListNames = countryData.filter((country)=>{
          return country.name.common.toUpperCase().includes(event.target.value.toUpperCase());
      });
    
      console.log(countryListNames);
      setActiveCountries(countryListNames);
    
      } 


      return(
        <>
        
       Find Country: <input onChange={showFilteredCountries}></input>
        
       {
        activeCountries.length <= 10 ? 

        activeCountries.length == 1 ? 
            <Country countryName={activeCountries[0]}/>
        :

        activeCountries.map((info)=>{
            return <p className={info.name.common}>{info.name.common}</p>
          }) 
          
        :
          
        <p>Too many results returned</p>

        }
        
          </>
      );

}