import { React, useState, useContext, createContext, useEffect } from "react";
import jwt from "jwt-decode";
import { SuccessfulAlert, ErrorAlert } from "../utils/AlertMessages"
import config from "../app.config";
import axios from "axios";
import validator from 'validator';


const AuthContext = createContext();


const AuthProvider = ({ children }) => {


    const BASE_URL = config.api
    const SIGNUP_URL = `${BASE_URL}/signUp`;
    const LOGIN_URL = `${BASE_URL}/login`;


    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);


    const login = async (email, password) => {

        if (!validator.isEmail(email)) return ErrorAlert("Wrong email format.")
        if (password.length < 6) return ErrorAlert("Password must be 6 character long.")

        try {

            const response = await axios.post(LOGIN_URL,{email,password});

            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setUser(jwt(response.data.token));
            SuccessfulAlert(response.data.message)

        } catch (error) {

            ErrorAlert(error.response.data)
            localStorage.removeItem("token");
            setToken(null);
        }
    };


    const signUp = async (email, password, passwordAgain) => {

        if (!validator.isEmail(email)) return ErrorAlert("Wrong email format.")
        if (password.length < 6) return ErrorAlert("Password must be 6 character long.")
        if (password !== passwordAgain) return ErrorAlert("The passwords must match.")

        try {

            const response = await axios.post(SIGNUP_URL,{email,password});

            if (response.status === 201) {   

                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                setUser(jwt(response.data.token));
                SuccessfulAlert(response.data.message)
            } 

        } catch (error) {

            ErrorAlert(error.response.data)
            setToken(null);
            localStorage.removeItem("token");
        } 
    }


    const logout = () => {

        setToken(null);

        setUser(null);

        localStorage.removeItem("token");

    };

    
    useEffect(() => {

        const tokenInStorage = localStorage.getItem("token");

        if (tokenInStorage) {

            setToken(tokenInStorage);
            
            setUser(jwt(tokenInStorage));
        }
    // eslint-disable-next-line
    }, []);


    return <AuthContext.Provider value={{ token, user, logout, login, signUp }}>
        {children}
    </AuthContext.Provider>; // provide value for my context

};

// custom hook
const useAuth = () => {

    const context = useContext(AuthContext); // read the context and subscribe to its changes

    if (!context) throw new Error("add AuthProvider to route"); // dev help only

    return context;
};

export { AuthProvider, useAuth };
