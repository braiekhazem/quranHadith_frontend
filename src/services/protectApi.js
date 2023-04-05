import axios from "axios";
const baseURL = process.env.REACT_APP_API_URL;
export const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const protectApi = axios.create({
  baseURL,
  headers,
  timeout: 10000,
});

protectApi.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers["Authorization"] = "Bearer " + accessToken;
    }
    return config;
  },
  (error) => {
    throw error;
  }
);

export const getData = (url, params = "") =>
  protectApi.get(`/${url}`, { params });
export const getOne = (url, id) => protectApi.get(`/${url}/${id}`);
export const getMe = (url) => protectApi.get(`/${url}`);
export const updateOne = (url, id, item) =>
  protectApi.put(`/${url}/${id}`, item);
export const createOne = (url, data) => protectApi.post(`/${url}`, data);
export const deleteOne = (url, id) => protectApi.delete(`/${url}/${id}`);
export default protectApi;
