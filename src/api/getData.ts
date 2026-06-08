import axios from "axios";
import { baseUrl } from "../config";
import { CategoryInfo, Problem , apiCategoryInfo, category } from "../types";

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

export  async function getAllProblems():Promise<Problem[]>{
    const response =  await axios.get<Record<string,Problem[]>[]>(`${baseUrl}/api/data/problems`)
    const problems = response.data?.[0]?.problems
    return problems;
}

export async function getProblemsByCategory(categoryName:category):Promise<Problem[]> {
    const response = await axios.get<Problem[]>(`${baseUrl}/api/data/problems/${categoryName}`)
    const problems = response.data
    // console.log("PROBLEMS = ")
    // console.log(problems)
    return problems;
}

export async function getProblems(category:string){
    if(category)
        return await getProblemsByCategory(category);
    return await getAllProblems();
}


export async function postAttempt(token:string,problem_id:string,state:boolean) {
    const response = await axios.post(`${baseUrl}/api/attempts`,
        {
            problem_id:problem_id,
            state:state
        }
        ,
        {
            headers:{
                Authorization:"bearer "+token
            }
        }
    )
}

export async function getAttempts() {
    const response = await axios.get(`${baseUrl}/api/attempts`
    )
}