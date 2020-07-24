import axios from "axios";

const countriesApi = axios.create({
  baseURL: "https://countries.tech-savvy.tech/countries",
});

export default countriesApi;
