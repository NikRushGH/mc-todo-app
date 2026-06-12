
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
}


export const CATEGORIES: Category[] = [
  { id: "tech", name: "Технологии", color: "#55aaff" },
  { id: "magic", name: "Магия", color: "#aa00aa" },
  { id: "resources", name: "Ресурсы", color: "#ffaa00" }
];
