import axios from "axios";

const client = axios.create();
const SERVER_DOMAIN = process.env.REACT_APP_SERVER_DOMAIN;
client.defaults.baseURL = `${SERVER_DOMAIN}/`;
client.defaults.withCredentials = true;

const token = localStorage.getItem("juptoken"); // access token

client.defaults.headers.common["Authorization"] = token
  ? `Bearer ${token}`
  : null;

export default client;
