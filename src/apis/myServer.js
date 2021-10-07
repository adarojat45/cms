import axios from "axios";

const myServer = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
});

export default myServer;
