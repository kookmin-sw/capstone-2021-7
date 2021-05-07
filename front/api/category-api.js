import { callAPI } from "./api-config";

const getRecommendCategory = ( data ) => {
    return callAPI("POST", "recommendcategory/", data);
  };

export { getRecommendCategory };