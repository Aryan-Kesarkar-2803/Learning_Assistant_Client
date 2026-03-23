import { generateRoadmapEndpoint, saveRoadmapEndpoint } from "../apiNames/getStarted";
import { getRequest, postRequest } from "../networks/server";
import { errorNotification } from "../toast";


export const generateRoadmap = async(topic) => {
    try{
        const response = await getRequest({
            url:generateRoadmapEndpoint,
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


export const saveRoadmap = async(data) => {
    try{
        const response = await postRequest({
            url:saveRoadmapEndpoint,
            data:{
                ...data
            }
        })
        if(response?.status != 200){
            errorNotification({message:response?.message})
        }
        return response;
    }catch(e){
        errorNotification({
            title: 'Error',
            message:'Roadmap not saved'
        })
        console.log(e?.message)
        return false;
    }

}
