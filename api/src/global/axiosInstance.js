// Instancia de Axios con algunas config
const axios = require('axios');

const baseURL = 'https://api.thedogapi.com/v1/breeds';
const { API_KEY } = process.env;

module.exports = axios.create({
    baseURL: baseURL,
    params: { api_key: API_KEY }
});