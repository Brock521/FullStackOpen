import { useState } from "react";
import Country from "./Country";

export default function CountryList({ countryData }) {
  const [activeCountries, setActiveCountries] = useState([]);
  const [activeCountry, setActiveCountry] = useState(null);

  function showFilteredCountries(event) {
    if (!countryData) {
      console.log("Country data not available");
      return;
    }

    const filterTerm = event.target.value.toUpperCase();
    const filteredCountries = countryData.filter((country) =>
      country.name.common.toUpperCase().includes(filterTerm)
    );

    console.log(filteredCountries);
    setActiveCountries(filteredCountries);
    setActiveCountry(null);
  }

  function handleShowCountry(country) {
    setActiveCountry(country);
  }

  function renderCountryList() {
    if (activeCountry) {
      return <Country country={activeCountry} />;
    }

    if (activeCountries.length === 0) {
      return null;
    }

    if (activeCountries.length === 1) {
      return <Country country={activeCountries[0]} />;
    }

    if (activeCountries.length <= 10) {
      return activeCountries.map((info) => (
        <p key={info.name.common}>
          {info.name.common}
          <button onClick={() => handleShowCountry(info)}>show</button>
        </p>
      ));
    }

    return <p>Too many results returned</p>;
  }

  return (
    <>
      Find Country: <input onChange={showFilteredCountries} />
      {renderCountryList()}
    </>
  );
}