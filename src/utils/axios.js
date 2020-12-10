import axios from "axios";

// axios instance
let baseURL;
if (process.env.NODE_ENV !== "production") {
  baseURL = "http://127.0.0.1:9000/";
} else {
  baseURL = process.env.REACT_APP_BACKEND_URL;
}
const api = axios.create({
  baseURL: baseURL,
});

export default api;
