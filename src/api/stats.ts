import axios from "axios";
import { baseUrl } from "../config";
import { Stats } from "../types";



export async function getStats(token:string) {
    const response = await axios.get<Stats>(`${baseUrl}/api/stats`,
        {
            headers:{
                Authorization:"bearer "+token
            }
        }
    )
    return response.data
}