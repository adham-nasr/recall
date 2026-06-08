import axios from "axios";
import type {Dispatch, User,  UserCreate, UserLogin } from "../types";
import { ACTION_TYPES } from "../reducers/authReducer";
import { baseUrl } from "../config";
export async function login(dispatch:Dispatch,userData:UserLogin){
    try{
        console.log("Logging IN ... ")
        const res = await axios.post<User>(baseUrl+"/auth/login",userData)
        console.log("Res " , res.data)
        dispatch({type:ACTION_TYPES.SET,payload:res.data})
    }catch(e){
        console.log("ERROR !!!")
        return e;
    }
}

export async function logout(dispatch:Dispatch,token:string){
    console.log("Logging OUT ... ")
    console.log("API KEY ", token)
    try{
        await axios.post(baseUrl+"/auth/logout",null,{
            headers: {
                Authorization:"Bearer "+token
            }
        })
        dispatch({type:ACTION_TYPES.DELETE})
    }
    catch(e){
        console.log("ERROR ", e)
    }
}

export async function register(dispatch:Dispatch,userData:UserCreate){
    try{
        const res = await axios.post<User>(baseUrl+"/auth/register",userData)
        dispatch({type:ACTION_TYPES.SET,payload:res.data})
    }catch(e){
        console.log(e)
        return e;
    }
}
