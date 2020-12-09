import axios from "axios";

//"http://localhost:9000/";

// get current user
const currentUser = JSON.parse(localStorage.getItem("user"));
let headers = {};

// attach user"s token to requests
if (currentUser && currentUser.token) {
  headers.Authorization = `Bearer ${currentUser.token}`;
}

// axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers,
});

export default api;
