
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
  { id: "resources", name: "Resources", color: "#fbbf24" },
  { id: "building", name: "Building", color: "#2dd4bf" },
  { id: "tech", name: "Technology", color: "#60a5fa" },
  { id: "magic", name: "Magic", color: "#c084fc" },
  { id: "farming", name: "Farming", color: "#a3e635" },
  { id: "exploration", name: "Exploration", color: "#f472b6" },
  { id: "combat", name: "Combat", color: "#f87171" }
];
