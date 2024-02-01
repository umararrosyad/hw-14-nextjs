// const axios = require('axios');

import {instance as axios}  from "../axios"

const getAllBooks = async () => {
  try {
    const response = await axios.get('api/books/');
    return response.data
  } catch (error) {
    console.error(error);
  }
}

const getOneBook = async (id) => {
  try {
    const response = await axios.get(`/api/books/${id}`);

    return response.data
  } catch (error) {
    console.error(error);
  }
};

const deleteBook = async (id) => {
  try {
    const response = await axios.delete(`/api/books/${id}`);
    return response.data
  } catch (error) {
    console.error(error);
  }
};

const editBook = async (id, title, author, publisher, year, pages) => {
  try {
    const response = await axios.put(`/api/books/${id}`, { title, author, publisher, year, pages });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`/api/login/`, { email, password});
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const createBook = async (formData) => {
  try {
    const response = await axios.post('/api/books', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    // console.log(response)
    return response
  } catch (error) {
    console.error(error);
  }
};


const registerUser = async (name, email, password) => {
  try {
    const response = await axios.post('/api/register', { name, email, password });
    // console.log(response)
    return response
  } catch (error) {
    console.error(error);
  }
};

module.exports = {getAllBooks,getOneBook,deleteBook,editBook,loginUser,createBook,registerUser}