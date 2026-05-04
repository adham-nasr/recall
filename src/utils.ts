import { Data } from "./types";

export function getRandomProblems(data:Data){
    let problems = []
    for(const key in data)
        problems.push(...data[key].problems)
    return problems.sort(() => Math.random() - 0.5);

}