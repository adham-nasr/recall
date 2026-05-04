import axios from "axios";
import { baseUrl } from "../../config";
import { CategoryInfo, Problem , Data } from "../../types";

export function getData(){
    return axios.get<Data>(`${baseUrl}/data`).then(res=>res.data)
}
export function getCategories(){
    return getData().then((res) => {
        console.log("res : ")
        console.log(res)
        let response = []
        for(const key in res)
        {
            response.push(
                {
                    id:String(res[key].id),
                    name:key,
                    count:res[key].size
                }
            )
        }
        return response
    })
}

export function getAllProblems(){
    return axios.get<Problem[]>(`${baseUrl}/data`).then(res=>res.data)
}