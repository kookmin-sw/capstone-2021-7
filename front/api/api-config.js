import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

axios.defaults.baseURL = "http://ec2-13-209-254-218.ap-northeast-2.compute.amazonaws.com/";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

const tokenConfig = async () => {
  // let token = null;
  // try {
  //   token = await AsyncStorage.getItem("userToken");
  //   console.log("token :", token);
  // } catch (e) {
  //   console.log(e);
  // }

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Token d24267451dad0b7c44d66cc7c466c3aee1e1a9cc"
    }
  };

  // if (token) {
  //   // config.headers["Authorization"] = `Token ${token}`;
  //   config.headers["Authorization"] = `${token}`;
  // }
  // config.headers["Authorization"] = token;

  return config;
};

const callAPI = async (method, url, data) => {
  console.log(`run ${method}:: '${url}' API.`);
  const config = await tokenConfig();
  switch (method) {
    case "GET":
      return axios.get(url, config);
    case "POST":
      return axios.post(url, JSON.stringify(data), config);
    case "PUT":
      return axios.put(url, JSON.stringify(data), config);
    case "DELETE":
      return axios.delete(url, JSON.stringify(data), config);
  }
};


export { tokenConfig, callAPI };