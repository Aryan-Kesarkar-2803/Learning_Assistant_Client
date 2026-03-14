import { getUserProfileEndpoint, loginUserEndpoint, registerUserEndpoint, updateUserProfileEndpoint } from "../apiNames/user";
import { getRequest, postRequest } from "../networks/server";
import { errorNotification } from "../toast";

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
export const updateUserProfile = async(data) => {
    try{
        const response = await postRequest({
            url:updateUserProfileEndpoint,
            data:data || {}
        })
        if(response?.status != 200){
            errorNotification({message:response?.message})
        }
        return response;
    }catch(e){
        errorNotification({
            title: 'Error',
            message:'Somthing went wrong'
        })
        return false;
    }
}
export const getUserProfile = async() => {
    try{
        const response = await getRequest({
            url:getUserProfileEndpoint
        })
        if(response?.status != 200){
            errorNotification({message:response?.message})
        }
        return response;
    }catch(e){
        errorNotification({
            title: 'Error',
            message:'Somthing went wrong'
        })
        console.log(e?.message)
        return false;
    }

}