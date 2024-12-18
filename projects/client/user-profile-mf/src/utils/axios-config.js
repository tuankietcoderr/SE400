import axios from "axios";
const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development" ? "http://localhost:8000/api" : "",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 100000, // 100 seconds
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(errRes);
  }
);

instance.interceptors.response.use(
  (response) => {
    const accessToken = response.data?.data?.accessToken;
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    }

    if (response.status === 401) {
      localStorage.removeItem("accessToken");
    }

    return response;
  },
  (error) => {
    // Do something with response error
    const errRes = error.response ?? error;
    return Promise.resolve(errRes);
  }
);

export default instance;
