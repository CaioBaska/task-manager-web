import axios from "axios";

export const httpClient = axios.create({
  baseURL: "https://localhost:7158/api",
});
