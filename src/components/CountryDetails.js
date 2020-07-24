import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import api from "../apis/countries";

const CountryDetails = () => {
  const { id } = useParams();

  const [country, setCountry] = useState({
    name: "",
    officialName: "",
    capital: "",
    flag: "",
  });

  useEffect(() => {
    (async function fetchCountry() {
      try {
        const response = await api.get(`/${id}`);

        const { name, capital, flag, languages } = response.data[0];

        const newCountry = {
          name: name.common,
          officialName: name.native[Object.keys(languages)[0]].official,
          capital: capital[0],
          flag: flag,
        };

        // Sintaxe alternativa
        // const newCountry = {
        //   name: response.data[0].name.common,
        //   officialName: response.data[0].name.native[Object.keys(response.data[0].languages)[0]].official,
        //   capital: response.data[0].capital[0],
        //   flag: response.data[0].flag,
        // };

        setCountry({ ...newCountry });
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <div>
      <div>
        <strong>Name: </strong> <span>{country.name}</span>
      </div>

      <div>
        <strong>Official Name: </strong> <span>{country.officialName}</span>
      </div>

      <div>
        <strong>Capital: </strong> <span>{country.capital}</span>
      </div>

      <div>
        <strong>Flag: </strong> <span>{country.flag}</span>
      </div>
    </div>
  );
};

export default CountryDetails;
