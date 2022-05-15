import axios from 'axios';

const deliveryApi = axios.create({
    baseURL: 'https://postgress-app-test.herokuapp.com',
});


export default deliveryApi;
