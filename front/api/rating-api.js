import { callAPI } from "./api-config";

const getSmallCategory = () => {
    return callAPI("GET", "smallcategory/", null);
  };

export { getSmallCategory };