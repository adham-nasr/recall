import axios from "axios";
import { baseUrl } from "../config";
import { CategoryInfo, Problem , apiCategoryInfo, category } from "../types";
import { practiceCriteria } from "../utils/constants";
import { createQueryString } from "../utils/helpers";

// export function getData(){
//     return axios.get<Data>(`${baseUrl}/data`).then(res=>res.data)
// }
// export function getCategories():Promise<CategoryInfo[]> {
//     return axios.get<apiCategoryInfo[]>(`${baseUrl}/categories`).then(
//         (res)=>{
//             return res.data.map(el=>{
//                 const category:CategoryInfo = {
//                     "id": String(el.id),
//                     "name":el.category,
//                     "count":el.size
//                 }
//                 return category
//             })
//         }
//     )
// }

export function getCategories():Promise<CategoryInfo[]> {
    return axios.get<apiCategoryInfo[]>(`${baseUrl}/api/data/categories`).then(
        (res)=>{
            return res.data.map(el=>{
                const category:CategoryInfo = {
                    "id": el._id,
                    "name":el.name,
                    "count":el.count
                }
                return category
            })
        }
    )
}

export  async function getAllProblems(criteria:practiceCriteria,token?:string):Promise<Problem[]>{
    const query = createQueryString({criteria})
    const tokenHeader = token ? {   headers:{Authorization:"bearer "+token}   }
                              : {}
    console.log("criteria = " , criteria )
    const response =  await axios.get<Problem[]>(`${baseUrl}/api/data/problems/${query}`,
        tokenHeader
    )
    console.log("RESPONSE   --  == = ")
    console.log(response.data.length)
    const problems = response.data
    return problems;
}

export async function getProblemsByCategory(categoryName:category,criteria:practiceCriteria,token?:string):Promise<Problem[]> {
    const query = createQueryString({criteria})
    const tokenHeader = token ? {   headers:{Authorization:"bearer "+token}   }
                              : {}
    const response = await axios.get<Problem[]>(`${baseUrl}/api/data/problems/${categoryName}/${query}`,
        tokenHeader
    )
    const problems = response.data
    return problems;
}



export async function getProblems(category?:string,criteria:practiceCriteria = "all",token?:string){
    if(category)
        return await getProblemsByCategory(category,criteria,token);
    return await getAllProblems(criteria,token);
}


export async function postAttempt(token:string,problem_id:string,state:boolean) {
    const response = await axios.post(`${baseUrl}/api/attempts`,
        {
            problemId:problem_id,
            state:state
        },
        {
            headers:{
                Authorization:"bearer "+token
            }
        }
    )
    return response;
}

// export async function getAttempts() {
//     const response = await axios.get(`${baseUrl}/api/attempts`
//     )
// }