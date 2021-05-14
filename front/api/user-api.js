import { callAPI } from "./api-config";

const postUserInformation = (postData) => {
    console.log("데이터",postData);
    return callAPI("POST", "user/signup/", postData);
  };

const checkUserName = (data) => {
  return callAPI("POST", 'user/checkusername/', data)
}

const checkPhone = (data) => {
  return callAPI("POST", 'user/checkphone/', data)
}

const login = (postData) => {
  console.log("데이터",postData);
  return callAPI("POST", "user/login/", postData);
};

const logout = (data) => {
  return callAPI("POST", "user/logout/", data);
}

const getOrder = () => {
  return callAPI("GET", "order/", null);
};

export { postUserInformation, login, logout, getOrder, checkUserName, checkPhone };