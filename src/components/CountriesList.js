import React, { useReducer, useEffect } from "react";
import { Link } from "react-router-dom";

import api from "../apis/countries";

import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";

function countriesReducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true };
    case "FETCH_END":
      return { ...state, countries: [...action.payload], loading: false };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: true };
    default:
      throw new Error("Unhandled action type");
  }
}

const CountriesList = () => {
  // Inicializando nosso state
  const [state, dispatch] = useReducer(countriesReducer, {
    error: false,
    loading: false,
    countries: [],
  });

  // Definicoes de efeitos colaterais
  useEffect(() => {
    (async function getCountries() {
      try {
        // Seta o state de loading para true, para exibir nosso Spinner, indicando ao usuario que algo esta acontecendo
        dispatch({ type: "FETCH_START" });
        // api e uma instancia do Axios pre-configurada com uma URL padrao
        const response = await api.get();

        // Atualize a lista de paises com o resultado da chamada HTTP
        dispatch({ type: "FETCH_END", payload: response.data });
      } catch {
        // Atualize o estado do componente para erro, para exibir a mensagem de erro
        dispatch({ type: "FETCH_ERROR" });
      }
    })();
  }, []);

  // Funcao para renderizar mensagem de erro
  function renderError() {
    return state.error ? <ErrorMessage /> : null;
  }

  // Retornando JSX
  return (
    <div>
      <h1>List of countries</h1>
      {renderError()}
      {/* Se countries tiver elementos, renderize uma lista. Caso contrario, renderize um feedback pro usuario de carregamento */}
      {!state.loading ? (
        <ul>
          {state.countries.map((country, i) => (
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
