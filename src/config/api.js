import axios from "axios";

// set config defaults while creating instance
export const API = axios.create({
  // baseURL: "http://localhost:5000/api/v1",
  baseURL: "https://mangaku-server.herokuapp.com/api/v1",
});

export const token = localStorage.getItem("token");

export const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};
