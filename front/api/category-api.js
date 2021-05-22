import { callAPI } from "./api-config";

const getRecommendCategory = ( data ) => {
    return callAPI("POST", "recommendcategory/", data);
  };

const getRecommendCategoryMany = ( data ) => {
  return callAPI("POST", "recommendcategorymany/", data);
};

const categoryFeedback = ( data ) => {
  console.log("data뭔데",data);
  return callAPI("POST", "userfeedback/", data);
};

export { getRecommendCategory, categoryFeedback,  getRecommendCategoryMany };