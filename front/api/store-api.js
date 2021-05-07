import { callAPI } from "./api-config";

const getStoreBySmallCatgory = ( data ) => {
    return callAPI("POST", "storesmallcategory/list/", data);
  };

const getStoreByBigCatgory = ( data ) => {
  return callAPI("POST", "storebigcategory/list/", data);
};

const getMenu = ( data ) => {
  return callAPI("GET", `menu/?store=${data}`, null);
};

const orderMenu = ( data ) => {
  return callAPI("POST", "usermenu/", data);
};

export { getStoreByBigCatgory, getStoreBySmallCatgory, getMenu, orderMenu };