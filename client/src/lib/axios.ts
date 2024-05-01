import Axios, { InternalAxiosRequestConfig } from "axios"
import { API_URL } from "../config"

export const axios = Axios.create({
    baseURL: API_URL,
    headers: {
        "Accept": "application/json"
    }
})

const requiresAuthorization = (path: string, method: string): boolean => {
    // Define routes that require authorization

  
    const authRoutes = [
        { path: '/poll', methods: ['POST'] },
        { path: '/vote', methods: ['GET', 'POST'] },
        { path: '/comment', methods: ['GET', 'POST'] },
        { path: '/user', methods: ['GET'] }
       
    ];

    // Check if the provided path and method match any route that requires authorization
    return authRoutes.some(route => route.path.endsWith(route.path)  && route.methods.includes(method));
};



// OUTGOING RESPONSE INTERCEPTOR 
axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = JSON.parse(String(localStorage.getItem("access_token")));

    if (token) {
        config.headers['Authorization'] = token;
    }
    
    return (config);
}, (error) => {
    return Promise.reject(error);
});
