
export interface Category {
    id: string;
    name: string;
    color: string;
}

export interface Task {
    id: string;
    text: string;
    isDone: boolean;
    categoryId: string;
    coordinates?: {
        x: number;
        y: number;
        z: number;
    };
}
