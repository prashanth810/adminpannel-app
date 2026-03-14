import Baseurl from "../utilities/Baseurl"

// get all user to admin 
export const getalluserslist = () => {
    return Baseurl.get(`/getallusers`);
}