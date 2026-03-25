import { getLearningByIdEndpoint, getUsersLearningEndpoint } from "../apiNames/learnings";
import { getRequest } from "../networks/server";
import { errorNotification } from "../toast";

export const getUsersLearnings = async(userId) => {
    try{
        const response = await getRequest({
            url:getUsersLearningEndpoint,
            params:{
                userId:userId,
            }
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
export const getLearningById = async(id) => {
    try{
        const response = await getRequest({
            url:getLearningByIdEndpoint,
            params:{
                id:id,
            }
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