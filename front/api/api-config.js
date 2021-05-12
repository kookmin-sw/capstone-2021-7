import axios from "axios";

import AsyncStorage from "@react-native-community/async-storage";

axios.defaults.baseURL = "http://ec2-13-209-254-218.ap-northeast-2.compute.amazonaws.com:8080/";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

const tokenConfig = async () => {
  let token = null;
  try {
    token = await AsyncStorage.getItem("userToken");
    console.log("token :", token);
  } catch (e) {
    console.log(e);
  }

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    }
  };

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};

const callAPI = async (method, url, data) => {
  console.log(`run ${method}:: '${url}' API.`);
  const config = await tokenConfig();
  console.log(config);
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
