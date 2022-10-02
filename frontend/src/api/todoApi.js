import axios from "axios";
import { SuccessfulAlert, ErrorAlert } from "../utils/AlertMessages"

export const todoApi = () => {

  const instance = axios.create({
    baseURL: "http://localhost:8080/api",
    timeout: 3000,
  });


  const post = async (path, data, dataType) => {
    try {
      const response = await instance.post(path, data, {});
      SuccessfulAlert(`${dataType} has been saved.`)
      return response;
    } catch (error) {
      if (error.response.status === 400) ErrorAlert("Name and description can't be empty")
      if (error.response.status === 409) ErrorAlert("Name and description must be unique")
      // console.log(error.response.status);
      // console.log(error.response.data);
      return error.response;
    }
  };


  const get = async (path) => {
    try {
      const response = await instance.get(path, {});
      return response;
    } catch (error) {
      // console.log(error.response.status);
      // console.log(error.response.data);
      return error.response;
    }
  };


  const del = async (path, dataType) => {
    try {
      const response = await instance.delete(path, {});
      SuccessfulAlert(`${dataType} has been deleted.`)
      return response;
    } catch (error) {
      // console.log(error.response.status);
      // console.log(error.response.data);
      ErrorAlert(`Ooops... Couldn't delete the ${dataType}`)
      return error.response;
    }
  };


  const update = async (path, data, dataType) => {
    try {
      const response = await instance.patch(path, data, {});
      SuccessfulAlert(`${dataType} has been updated.`)
      return response;
    } catch (error) {
      // console.log(error.response.status);
      // console.log(error.response.data);
      ErrorAlert(`Ooops... Couldn't update the ${dataType}`)
      return error.response;
    }
  };

  return { post, get, del, update };
};