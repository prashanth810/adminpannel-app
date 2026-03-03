import Baseurl from "../utilities/Baseurl";



export const getallcategories = () => {
    return Baseurl.get(`/categories`);
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