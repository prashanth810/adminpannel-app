import Baseurl from "../utilities/Baseurl";



export const getallcategories = (page = 1, limit = 10) => {
    return Baseurl.get(`/categories`, { params: { page, limit } });
}
// create categories
export const createcategory = async (data) => {
    const formData = new FormData();

    formData.append("name", data.name);

    formData.append("imageurl", {
        uri: data.image,
        type: "image/jpeg", // or image/png
        name: "category.jpg",
    });

    return Baseurl.post(`/create`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};


// dete category
export const handledeletecat = (id) => {
    return Baseurl.delete(`/category/${id}`);
}