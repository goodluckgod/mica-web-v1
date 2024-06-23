import axios from "axios";

export default ({ app }, inject) => {
  // Axios instance oluştur
  const api = axios.create({
    baseURL: "https://turkiyeapi.dev/api",
    headers: {
      common: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    },
  });

  // İstek interceptor'u ekle
  api.interceptors.request.use(
    (config) => {
      // Gerekli ise burada JWT token veya başka ayarları ekleyebilirsiniz
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Yanıt interceptor'u ekle
  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // Hataları burada yönetebilirsiniz
      return Promise.reject(error);
    }
  );

  // Axios instance'ı Vue instance'a ve context'e ekle
  inject("turkey", api);
};
