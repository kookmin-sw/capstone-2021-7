import { callAPI } from "./api-config";

const getRecommendCategory = ( data ) => {
    return callAPI("POST", "recommendcategory/", data);
  };

const categoryFeedback = ( data ) => {
  console.log("data뭔데",data);
  return callAPI("POST", "userfeedback/", data);
};

export { getRecommendCategory, categoryFeedback };