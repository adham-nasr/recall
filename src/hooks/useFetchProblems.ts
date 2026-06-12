import { useQuery } from "@tanstack/react-query";
import { practiceCriteria } from "../utils/constants";
import { getProblems } from "../api/getData";
import { useAuth } from "./useAuth";

type args = {
    category?:string,
    criteria?:practiceCriteria,
}
export function useFetchProblems({category,criteria}:args) {

    const {user} = useAuth()

    const loggedQuery = useQuery({
      queryKey:["problems",category,criteria,user!.token],
      queryFn:()=>getProblems(category,criteria,user!.token)
    })

    const guestQuery = useQuery({
      queryKey:["problems",category,criteria],
      queryFn:()=>getProblems(category,criteria)
    })

    const query = user ? loggedQuery : guestQuery;

    const {data,error,isLoading} = query
    return {data,error,isLoading}
}

