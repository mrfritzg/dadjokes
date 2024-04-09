import axios from "axios";

export const jokesFetch = axios.create({
  baseURL: "https://icanhazdadjoke.com/",
  headers: {
    Accept: "application/json",
  },
});

export const jokesDBFetch = axios.create({
  baseURL: "/api/v1",
});
