import Baseurl from "../utilities/Baseurl";


// get all prodcts by category id
export const handlegetproducts = (categoryId) => {
    return Baseurl.get(`/${categoryId}/products`);
}

// create a new product 
export const handlecreateproducts = async (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("stock", data.stock);
    formData.append("description", data.description);
    formData.append("categoryId", data.categoryId);

    formData.append("imageurl", {
        uri: data.image,
        type: "image/jpeg",
        name: "product.jpg",
    });

    return Baseurl.post("/addproducts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};