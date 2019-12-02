import axios from "axios";

export const fetchData = async path => {
	const url = `${process.env.REACT_APP_API_URL}${path}`;
	const token = localStorage.getItem("access");
	axios.defaults.headers = {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`
	};

	return axios.get(url);
};

export const postData = async (path, data) => {
	const url = `${process.env.REACT_APP_API_URL}${path}`;
	const token = localStorage.getItem("access");
	axios.defaults.headers = {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`
	};

	return axios.post(url, data);
};

export const putData = async (path, data) => {
	const url = `${process.env.REACT_APP_API_URL}${path}`;
	const token = localStorage.getItem("access");
	axios.defaults.headers = {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`
	};

	return axios.put(url, data);
};

export const deleteItem = async path => {
	const url = `${process.env.REACT_APP_API_URL}${path}`;
	const token = localStorage.getItem("access");
	axios.defaults.headers = {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`
	};

	return axios.delete(url);
};
