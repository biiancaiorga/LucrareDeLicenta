import axios from 'axios';

const API_URL = 'https://localhost:7075/api'; // Replace with your actual backend URL

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  error => {
    Promise.reject(error)
  });

export const getMenuItems = async () => {
  try {
    const response = await axiosInstance.get('/Menu');
    return response.data;
  } catch (error) {
    console.error('Error fetching menu items', error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  console.log('Register Payload:', userData); // Log the payload
  try {
    const response = await axiosInstance.post('/User/register', {
      Username: userData.name, 
      Email: userData.email,
      Password: userData.password
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error registering user', error.response.data);
    } else {
      console.error('Error registering user', error.message);
    }
    throw error;
  }
};

export const loginUser = async (userData) => {
  console.log('Login Payload:', userData); // Log the payload
  try {
    const response = await axiosInstance.post('/User/login', {
      Email: userData.email,
      Password: userData.password
    }, {credentials: 'include'});
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error logging in user', error.response.data);
    } else {
      console.error('Error logging in user', error.message);
    }
    throw error;
  }
};


export const getOrderItemsForUser = async () => {
  try {
    const response = await axiosInstance.get('/OrderItem/user');
    console.log('Fetched Order Items:', response.data); // Added logging for fetched items
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error fetching order items', error.response.data);
    } else {
      console.error('Error fetching order items', error.message);
    }
    throw error;
  }
};

// Add more API functions as needed
