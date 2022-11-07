// Instancia de Axios con algunas config
const axios = require('axios');

const { API_KEY, API_BASE_URL } = process.env;

module.exports = axios.create({
    baseURL: API_BASE_URL,
    params: { api_key: API_KEY }
});