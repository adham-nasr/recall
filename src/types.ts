export type category = string;

export type CategoryInfo = {
    id: string;
    name: category;
    count: number;  
}
export type apiCategoryInfo = {
    _id: string;
    name: category;
    count: number;
}

// export type CategoryData = {
//     id: number;
//     size:number;
//     problems: Problem[];

// }

export type Problem = {
    _id:string;
    pNumber:number;
    statement:string;
    category:category;
    explanation?:string;
    answers:Answer[];
    topic?:string;
}

export type Answer = {
    _id?:string;
    content:string;
    isCorrect:boolean;
}
export enum states {
    unselected,
    wrong,
    correct
}


export type User = {
    _id:string,
    name:string,
    email:string,
    password:string,
    token:string
}
// export type Data = Record<category,CategoryData>
export type UserCreate = Pick<User, "name"|"email"|"password">

export type UserLogin = Omit<UserCreate,"name">

export type AuthState = User | null;

export type Dispatch = React.Dispatch<Record<string, any>>
export type AuthContextType = {
  user: AuthState;
  dispatch: Dispatch;
};

