import axios from 'axios';

const deliveryApi = axios.create({
    baseURL: import.meta.env.VITE_APP_API_KEY,
});


export default deliveryApi;
