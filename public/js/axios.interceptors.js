// set default baseURL
axios.defaults.baseURL = 'http://localhost:3000/api/v1/';

// https://axios-http.com/docs/interceptors
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Haz algo antes que la petición sea enviada
    config.headers.authorization = localStorage.getItem('token') || '';
    return config;
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Cualquier código de estado que este dentro del rango de 2xx causa la ejecución de esta función 
    return response;
}, function (error) {
    // Cualquier código de estado que este fuera del rango de 2xx causa la ejecución de esta función
    const { status } = error.response;
    if (status === 401 || status === 403) {
        localStorage.clear();
        location.href = '/login';
    }

    return Promise.reject(error);
});