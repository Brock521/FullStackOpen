
export default function Country({country}){

    console.log("In country" + country.languages);
    return(
    <>
        <h2>{country.name.common}</h2>
        <p>Capital City: {country.capital}</p>
        <p>Area: {country.area}</p>
        <b>Languages:</b>
        
        <ul>
        {Object.values(country.languages).map((language, index) => (
          <li>{language}</li> 
        ))}
      </ul>

        <img src={country.flags.png} alt={country.flags.alt}></img>
        
      </>

);


}