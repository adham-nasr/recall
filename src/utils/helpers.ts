import { Problem, Stats } from "../types";
import { categories, primaryHue } from "./constants";

export const hsl = (h:number, s:number, l:number, a = 1) => `hsla(${h}, ${s}%, ${l}%, ${a})`;

export function getRandomProblems(data:Problem[]):Problem[]{
	const deepCopy = structuredClone(data);
    return deepCopy.sort(() => Math.random() - 0.5);

}

export function ratioAttempts(data:Stats){
    const ratioData = data.categoryStats.map(cat=>{
        const attempt = data.attemptsStats.find(att => att.category_id === cat._id)
        return {
          id:cat._id,
          name:cat.name,
          solved: attempt?.solved || 0,
          total:cat.count,
          progress: attempt ? Math.ceil(attempt.solved * 100/cat.count) : 0
        }
    })
    return ratioData
}

export type ratioType = ReturnType<typeof ratioAttempts>[number]


export function abstractCategoryColor(category:string){
    const step = 360/(categories.length + 1);
    const index = categories.findIndex(el=>el===category)
    return [primaryHue+(index*step),55,55]
}
export function getCategoryColor(category:string){
    
    const [h,s,l] = abstractCategoryColor(category)

    return hsl(h,s,l);

}

export function getCategoryTextColor(category:string){
    const [h,s,l] = abstractCategoryColor(category)
    return hsl(h,s,40);
}


export function createQueryString(filterParams:Record<string,any>){
    let query = "?";
    for(let key in filterParams)
    {
        query+=(key+"="+encodeURIComponent(filterParams[key]))
        query+="&" 
    }
    query = query.slice(0,-1)
    return query;
}


export function changeTopic(problems:Problem[],pNumber:number,dir:number){
    if(!problems.length)
        return 0;
    const problem = problems[pNumber];
    if(dir===1)
        return problems.findIndex((el,ind)=> el.topic !== problem.topic && ind>pNumber)
    let diff = problems.findLastIndex((el,ind)=> el.topic !== problem.topic && ind<pNumber)
    if(diff===-1)
        return -1;
    return problems.findIndex(el=>el.topic===problems[diff].topic)
}