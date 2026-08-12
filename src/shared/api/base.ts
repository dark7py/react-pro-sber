import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.v2.react-learning.ru",
});
