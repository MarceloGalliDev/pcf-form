import axios from "axios";

const AxiosApi = axios.create({
  baseURL: "http://localhost:3333"
});

export default AxiosApi;