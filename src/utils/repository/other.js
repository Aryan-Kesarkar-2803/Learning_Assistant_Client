import { verifyTokenEndpoint } from "../apiNames/other";
import { getRequest } from "../networks/server";

export const firstRequest = async() => {
        const response = await getRequest({
            url:verifyTokenEndpoint,
        })

        if(response?.status == 401){
            return false;
        }else{
           return true
        }
}
