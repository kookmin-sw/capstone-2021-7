import { callAPI } from "./api-config";

const postUserInformation = (postData) => {
    console.log("데이터",postData);
    return callAPI("POST", "user/signup/", postData);
  };

export { postUserInformation };