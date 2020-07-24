import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import api from "../apis/countries";

import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";

const CountriesList = () => {
  // Inicializando nosso state

  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(false);

  // Definicoes de efeitos colaterais
  useEffect(() => {
    (async function getCountries() {
      try {
        // api e uma instancia do Axios pre-configurada com uma URL padrao
        const response = await api.get();

        // Atualize a lista de paises com o resultado da chamada HTTP
        setCountries([...response.data]);
      } catch {
        // Atualize o estado do componente para erro, para exibir a mensagem de erro
        return setError(true);
      }
    })();
  }, []);

  // Funcao para renderizar mensagem de erro
  function renderError() {
    return error ? <ErrorMessage /> : null;
  }

  // Retornando JSX
  return (
    <div>
      <h1>List of countries</h1>
      {renderError()}
      {/* Se countries tiver elementos, renderize uma lista. Caso contrario, renderize um feedback pro usuario de carregamento */}
      {countries.length ? (
        <ul>
          {countries.map((country, i) => (
            <li key={i}>
              <Link to={`/country/${country.name.common}`}>
                {country.name.official}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default CountriesList;
