import axios from "axios";

const tiendaApi = axios.create({
    baseURL: process.env.PATH_API
});

export default tiendaApi;