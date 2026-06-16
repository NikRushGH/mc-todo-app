
export interface Category {
    id: string;
    name: string;
    color: string;
}

export interface Task {
    id: string;
    text: string;
    isDone: boolean;
    categoryId?: string;
    coordinates?: {
        x: number;
        y: number;
        z: number;
    };
    createdAt: number;
}


export const CATEGORIES: Category[] = [
  { id: "tech", name: "Technology", color: "#55aaff" },
  { id: "magic", name: "Magic", color: "#aa00aa" },
  { id: "resources", name: "Resources", color: "#ffaa00" }
];
