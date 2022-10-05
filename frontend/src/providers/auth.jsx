import { React, useState, useContext, createContext, useEffect } from "react";
import jwt from "jwt-decode";
import { SuccessfulAlert, ErrorAlert } from "../utils/AlertMessages"
import config from "../app.config";
import axios from "axios";

const AuthContext = createContext();


const AuthProvider = ({ children }) => {

  const BASE_URL = config.api
  const SIGNUP_URL = `${BASE_URL}/signUp`;
  const LOGIN_URL = `${BASE_URL}/login`;

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const login = async (email, password,) => {
    try {
      const response = await axios.post(LOGIN_URL, {
        email,
        password,
      });
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setUser(jwt(response.data.token));
      SuccessfulAlert("Successful login")
    } catch (error) {
      if (error.response.status === 400) ErrorAlert("Invalid email or password")
      if (error.response.status === 404) ErrorAlert("User not found")
      setToken(null);
      localStorage.removeItem("token");
    }
  };


  const signUp = async (email, password) => {
    try {
      const response = await axios.post(
        SIGNUP_URL,
        { email, password });
      if (response.status === 201) {      
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setUser(jwt(response.data.token));
        SuccessfulAlert("Successful sign up")
      } 
    } catch (error) {
      if (error.response?.status === 400) ErrorAlert("Invalid email or password");
      if (error.response?.status === 409) ErrorAlert("Email taken");
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

  // useEffect(()=>{
  //   console.log(user);
  // },[user])

  return <AuthContext.Provider value={{ token, user, logout, login, signUp }}>{children}</AuthContext.Provider>; // provide value for my context
};

// custom hook
const useAuth = () => {
  const context = useContext(AuthContext); // read the context and subscribe to its changes
  if (!context) throw new Error("add AuthProvider to route"); // dev help only
  return context;
};

export { AuthProvider, useAuth };
