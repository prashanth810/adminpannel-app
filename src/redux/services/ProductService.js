import Baseurl from "../utilities/Baseurl";



export const handlegetproducts = (categoryId) => {
    return Baseurl.get(`/${categoryId}/products`);

}