import { generateNotesEndpoint, generateQuizEndpoint, getLearningByIdEndpoint, getNotesEndpoint, getUsersLearningEndpoint, getVideoEndpoint } from "../apiNames/learnings";
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

export const getVideoForTopic = async(topic) => {
    try{
        const response = await getRequest({
            url: getVideoEndpoint,
            params:{
                topic:topic,
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

export const generateNotesForTopic = async(topic) => {
    try{
        const response = await getRequest({
            url: generateNotesEndpoint,
            params:{
                topic:topic,
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
export const getNotesById = async(id="") => {
    try{
        const response = await getRequest({
            url: getNotesEndpoint,
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
export const generateQuizForTopic = async(topic) => {
    try{
        const response = await getRequest({
            url: generateQuizEndpoint,
            params:{
                topic:topic,
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