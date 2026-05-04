export type category = string;

export type CategoryInfo = {
    id: string;
    name: category;
    count: number;  
}

export type CategoryData = {
    id: number;
    size:number;
    problems: Problem[];

}

export type Problem = {
    id:number;
    statement:string;
    category:category;
    explanation?:string;
    answers:Answer[];
}

export type Answer = {
    id:number;
    content:string;
    isCorrect:boolean;
}
export enum states {
    unselected,
    wrong,
    correct
}

export type Data = Record<category,CategoryData>
