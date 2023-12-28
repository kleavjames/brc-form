import axios from "axios";

// const origins = [import.meta.env.VITE_BRC_API_URL];

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BRC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// instance.interceptors.request.use(
//   (config) => {
//     const { origin } = new URL(config.url || "", config.baseURL);
//     const allowedOrigins = origins;
//     const token = localStorage.getItem("token");
//     if (allowedOrigins.includes(origin)) {
//       config.headers.authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export const errorHandler = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    if (error.code === "ECONNABORTED") {
      return {
        success: false,
        message:
          "Problem with internet connection. Please make sure your internet is stable.",
      };
    } else if (error.code === "ERR_NETWORK") {
      return {
        success: false,
        message:
          "Problem with internet connection. Please make sure your internet is stable.",
      };
    } else if (error.code === "ERR_BAD_REQUEST") {
      const data = error.response?.data;
      return {
        success: false,
        message: data.error,
      };
    } else {
      return {
        success: false,
        message: "Something went wrong. Please try again later.",
      };
    }
  } else {
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
};
