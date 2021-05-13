import { callAPI } from "./api-config";

const postUserInformation = (postData) => {
    console.log("데이터",postData);
    return callAPI("POST", "user/signup/", postData);
  };

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

const getLocationList = () => { 
  return callAPI("GET", "location/", null);
}

const postLocation = (data) => { 
  console.log(data);
  return callAPI("POST", "location/", data);
}

export { postUserInformation, login, logout, getOrder, getLocationList, postLocation };