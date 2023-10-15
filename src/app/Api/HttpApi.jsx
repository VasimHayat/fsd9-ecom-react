import axios from 'axios'
import { API_URLS } from './ApiConstant';

const BASE_URL = 'http://localhost:8080/api/v1/'; 
let DEFAULT_CONFIG = {
    headers: {
    'Content-Type': 'application/json'
    }
};

export const fetchAllCategory = async () => {
    try {
        const response = await axios.get(`${BASE_URL}${API_URLS.ALL_PRODUCT_CATEGORY}`);
        return response.data;
        
    } catch (error) {
        console.log(error.message);
    }
} 

export const fetchAllProduct = async () => {
    try {
        const response = await axios.get(`${BASE_URL}${API_URLS.ALL_PRODUCT}`);
        return response.data;
        
    } catch (error) {
        console.log(error.message);
    }
} 

export const fetchProductByCategory = async (catgId) => {
    try {
        const response = await axios.get(`${BASE_URL}${API_URLS.PRODUCTS_BY_CATEGORY}/${catgId}`);
        return response.data;
        
    } catch (error) {
        console.log(error.message);
    }
} 

export const fetchProductBySeller = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}${API_URLS.PRODUCTS_BY_SELLER}/${id}`);
        return response.data;
        
    } catch (error) {
        console.log(error.message);
    }
} 


export const fetchProductDetail = async (prodId) => {
    try {
        const response = await axios.get(`${BASE_URL}${API_URLS.ALL_PRODUCT}/${prodId}`);
        return response.data;
        
    } catch (error) {
        console.log(error.message);
    }
} 


export const postApiForRegistration = (payload) => {
    return axios.post(`${BASE_URL}${API_URLS.REGISTER}`, payload, DEFAULT_CONFIG);
}

export const postApiForLogin = (payload) => {
    return axios.post(`${BASE_URL}${API_URLS.LOGIN}`, payload, DEFAULT_CONFIG);
}
