import { Problem } from "./types";

export function getRandomProblems(data:Problem[]):Problem[]{
	const deepCopy = structuredClone(data);
    return deepCopy.sort(() => Math.random() - 0.5);

}