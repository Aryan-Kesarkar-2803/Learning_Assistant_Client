import axios from "axios";
import { homeRequestSentimentModelEndpoint, verifyTokenEndpoint } from "../apiNames/other";
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

export const homeRequestSentimentModel = async() => {

        try{
        const response = await axios.get(homeRequestSentimentModelEndpoint,{
            headers:{
                'Content-Type':'application/json',
            }
        })
        return response;
    }catch(e){
        console.error('Error - ',e.message);
        return e?.response|| {}
    }
}
