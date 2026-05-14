import axios from "axios";
import { baseUrl } from "../../config";
import { CategoryInfo, Problem , Data, apiCategoryInfo, category } from "../../types";

export function getData(){
    return axios.get<Data>(`${baseUrl}/data`).then(res=>res.data)
}
export function getCategories():Promise<CategoryInfo[]> {
    return axios.get<apiCategoryInfo[]>(`${baseUrl}/categories`).then(
        (res)=>{
            return res.data.map(el=>{
                const category:CategoryInfo = {
                    "id": String(el.id),
                    "name":el.category,
                    "count":el.size
                }
                return category
            })
        }
    )
}

export  async function getAllProblems():Promise<Problem[]>{
    const response =  await axios.get<Record<string,Problem[]>[]>(`${baseUrl}/problems`)
    const problems = response.data?.[0]?.problems
    return problems;
}

export async function getProblemsByCategory(categoryName:category):Promise<Problem[]> {
    const response = await axios.get<Record<string,Problem[]>[]>(`${baseUrl}/problems/${categoryName}`)
    const problems = response.data?.[0]?.problems
    return problems;
}

export async function getProblems(category:string){
    if(category)
        return await getProblemsByCategory(category);
    return await getAllProblems();
}