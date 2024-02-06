import axios from "axios";

export const jokesFetch = axios.create({
  baseURL: "https://icanhazdadjoke.com/",
  headers: {
    Accept: "application/json",
    // "User-Agent": "MrFritz Test Website",
  },
});
