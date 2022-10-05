import axios from "axios";
import { SuccessfulAlert, ErrorAlert } from "../utils/AlertMessages"
import config from "../app.config";

export const todoApi = () => {

  const instance = axios.create({
    baseURL: config.api,
    timeout: 3000,
  });


  const post = async (path, data, dataType) => {
    try {
      const response = await instance.post(path, data, {
        headers: {
          authorization: localStorage.getItem("token"),
        }
      });
      SuccessfulAlert(`${dataType} has been saved.`)
      return response;
    } catch (error) {
      if (error.response.status === 400) ErrorAlert("Name and description can't be empty")
      if (error.response.status === 409) ErrorAlert("Name and description must be unique")
      return error.response;
    }
  };


  const get = async (path) => {
    try {
      const response = await instance.get(path, {
        headers: {
          authorization: localStorage.getItem("token"),
        }
      });
      return response;
    } catch (error) {
      // console.log(error.response.status);
      // console.log(error.response.data);
      return error.response;
    }
  };


  const del = async (path, dataType) => {
    try {
      const response = await instance.delete(path, {
        headers: {
          authorization: localStorage.getItem("token"),
        }
      });
      SuccessfulAlert(`${dataType} has been deleted.`)
      return response;
    } catch (error) {
      ErrorAlert(`Ooops... Couldn't delete the ${dataType}`)
      return error.response;
    }
  };


  const update = async (path, data, dataType) => {
    try {
      const response = await instance.patch(path, data, {
        headers: {
          authorization: localStorage.getItem("token"),
        }
      });
      SuccessfulAlert(`${dataType} has been updated.`)
      return response;
    } catch (error) {
      if (error.response.status === 400) ErrorAlert("Name and description can't be empty")
      if (error.response.status === 409) ErrorAlert("Name or description already taken")
      // console.log(error.response.status);
      // console.log(error.response.data);
      return error.response;
    }
  };

  return { post, get, del, update };
};