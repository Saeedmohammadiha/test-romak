import axios from 'axios';
//axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('token')}`;

export const instanceAxios = axios.create({
  baseURL: 'https://dummyjson.com/auth',
});

instanceAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

instanceAxios.interceptors.response.use(
  (response) => {
    // block to handle success case
    return response;
  },
  function (error) {
    // block to handle error case
    const originalRequest = error.config;
    console.log(error);
    if (
      error.response.status === 401 &&
      originalRequest.url === 'https://dummyjson.com/auth/token'
    ) {
      // Added this condition to avoid infinite loop
      window.location.pathname = '/'

      // Redirect to any unauthorised route to avoid infinite loop...
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      // Code inside this block will refresh the auth token

      originalRequest._retry = true;
      const refreshToken = 'xxxxxxxxxx'; // Write the  logic  or call here the function which is having the login to refresh the token.
      return instanceAxios
        .post('/token', {
          refresh_token: refreshToken,
        })
        .then((res) => {
          if (res.status === 201) {
            localStorage.setItem('token', res.data);
            instanceAxios.defaults.headers.common['Authorization'] =
              'Bearer ' + localStorage.getItem('token');
            return instanceAxios(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);
