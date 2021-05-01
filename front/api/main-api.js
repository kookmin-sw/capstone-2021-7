import { callAPI } from "./api-config";

const getBigCategory = () => {
    return callAPI("GET", "bigcategory/", null);
  };

export { getBigCategory };