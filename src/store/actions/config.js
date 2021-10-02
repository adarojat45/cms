import axios from "axios";

const getToken = () => {
	return localStorage.getItem("token");
};

export const dev = process.env.REACT_APP_DEV;
export const apiUrl = process.env.REACT_APP_API_URL;
export const axiosInstance = axios.create({
	baseURL: apiUrl,
	headers: { token: getToken() },
});

export const cloudinaryOptions = {
	cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD,
	upload_preset: process.env.REACT_APP_CLOUDINARY_PRESET,
};
