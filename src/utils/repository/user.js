import { loginUserEndpoint, registerUserEndpoint } from "../apiNames/user";
import { postRequest } from "../networks/server";

export const registerUser = async(data) => {
    try{
        const response = await postRequest({
            url:registerUserEndpoint,
            data:data || {}
        })
           return response;
    }catch(e){
        errorNotification({
            title: 'Error',
            message:'Something went wrong'
        })
        return false;
    }
}
export const loginUser = async(data) => {
    try{
        const response = await postRequest({
            url:loginUserEndpoint,
            data:data || {}
        })
        return response;
    }catch(e){
        errorNotification({
            title: 'Error',
            message:'Somthing went wrong'
        })
        return false;
    }

}