import { getApiWithAuthorization } from "../APIServices/APIServices/APIServices";
import { Base_URL } from "../components/Base_URL";

export const addToWishListApi = async (productKeyID: string, userKeyID: string) => {
    try {
        const url = `${Base_URL}/product/addToWishlist?userKeyID=${userKeyID}&productKeyID=${productKeyID}`;
        const res = await getApiWithAuthorization(url);
        return res;
    } catch (error) {
        console.error("Error in addToWishListApi:", error);
        throw error;
    }
};
