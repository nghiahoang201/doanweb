import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:8000/api/v1/",
});

export default request;
