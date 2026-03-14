import Baseurl from "../utilities/Baseurl";


export const handlegetproducts = (categoryId, page = 1, limit = 10) => {
    return Baseurl.get(`/${categoryId}/products`, { params: { page, limit } });
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