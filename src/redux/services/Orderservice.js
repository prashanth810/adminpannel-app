import Baseurl from "../utilities/Baseurl";

// get all orders
export const getallorders = () => {
    return Baseurl.get(`/adminorders`);
}

// get singlr order data 
export const getsingleorderdata = (id) => {
    return Baseurl.get(`/orders/${id}`);
}
