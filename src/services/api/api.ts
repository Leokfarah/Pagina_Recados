import axios from "axios";

// const online = 'https://api-recados.vercel.app/';
const local = 'http://localhost:8080';

export const api = axios.create({
    // baseURL: online,
    baseURL: local,
    headers: {
        "Content-type": "application/json",
    },
});