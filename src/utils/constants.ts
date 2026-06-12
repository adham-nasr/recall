

export const paths = {
    LOGIN:"/login",
    REGISTER:"/register",
    INDEX:"/",
    PRACTICE_GROUND:"/practice",
    CATEGORIES:"/categories"
}

export const categories = [
    'Web',
    'DBMS',
    'OOP',
    "OS",
    "Data Structures",
    "Networking"
]
export const primaryHue = 191;

export const practiceCriterias = {
    ALL:"all",
    UNSOLVED:"unsolved",
    UNATTEMPTED:"unattempted",
    WRONG_ATTEMPT:"wrongAttempt"
} as const
export type practiceCriteria = typeof practiceCriterias[keyof typeof practiceCriterias]; 