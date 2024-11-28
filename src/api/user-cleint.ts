import axios from "axios";
import { userType } from "../types/userType";

export const registerUser = async (user: userType) => {
    try {   
             
        const response = await axios.post(`http://localhost:4000/api/v1/register`, user);
        console.log(response.data);
        
    
        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
        }    
        return response.data;

    } catch (error) {
        console.log("Register error:", error);
    }
};

export const loginUser = async (credentials: { email: string, password: string }) => {
    try {
        const response = await axios.post(`http://localhost:4000/api/v1/login`, credentials);
        
        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
        }

        return response.data;
    } catch (error) {
        console.log("Login error:", error);
        const errorInLog = 'One or both of your email or password is incorrect'
        return error
    }
};