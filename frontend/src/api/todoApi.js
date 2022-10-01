import axios from "axios";


export const todoApi = () => {
  const instance = axios.create({
    baseURL: "http://localhost:8080/api",
    timeout: 3000,
  });


  const post = async (path, data) => {
    try {
      const response = await instance.post(path, data, {});
      return response;
    } catch (error) {
      console.log(error.response.status);
      console.log(error.response.data);
      return error.response;
    }
  };


  const get = async (path) => {
    try {
      const response = await instance.get(path, {});
      return response;
    } catch (error) {
      console.log(error.response.status);
      console.log(error.response.data);
      return error.response;
    }
  };


  const del = async (path) => {
    try {
      const response = await instance.delete(path, {});
      return response;
    } catch (error) {
      console.log(error.response.status);
      console.log(error.response.data);
      return error.response;
    }
  };


  const update = async (path, data) => {
    try {
      const response = await instance.patch(path, data, {});
      return response;
    } catch (error) {
      console.log(error.response.status);
      console.log(error.response.data);
      return error.response;
    }
  };

  return { post, get, del, update };
};