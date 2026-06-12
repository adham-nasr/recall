import { useQuery } from "@tanstack/react-query"
import { useAuth } from "./useAuth"
import { getCategories } from "../api/getData"
import { getStats } from "../api/stats"
import { ratioAttempts } from "../utils/helpers"
import { CategoryInfo, CategoryStat, Stats } from "../types"


export function useFetchCategories(){
    
    const {user} = useAuth()

    const queryCategory = useQuery({
        queryKey:["categories"],
        queryFn:getCategories,
        enabled: !user
    })
    const queryStats = useQuery({
      queryKey:["stats",user?.token],
      queryFn:()=>getStats(user!.token),
      enabled: !!user
    })

    const query = user ? queryStats : queryCategory

    const {data , error , isLoading}  = query
    
    let ratioData: ReturnType<typeof ratioAttempts>;
    if(!data)
        ratioData = []
    else
    {
        if(user)
            ratioData = ratioAttempts(data as Stats)
        else
        {
            const temp = {attemptsStats:[]
                     ,
                         categoryStats:(data as CategoryInfo[]).map(cat=>{
                            return {
                                _id:cat.id,
                                name:cat.name,
                                count:cat.count
                            } as CategoryStat
                         }) 
                    }
            ratioData = ratioAttempts(temp)
        }
    }
    return {data:ratioData||[] , error,isLoading}
}