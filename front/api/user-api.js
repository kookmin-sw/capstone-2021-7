import { callAPI } from "./api-config";

const postUserInformation = (postData) => {
    return callAPI("POST", "user/signup/", postData);
  };

export { postUserInformation };