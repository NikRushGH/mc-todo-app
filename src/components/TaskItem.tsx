import type { Task } from '../types';
import { useState } from 'react';

import { Input, Button, Chip, Checkbox } from "@heroui/react";


interface TaskItemProps {
    task: Task;
    onToggle: (taskId: string) => void;
    onDelete: (taskId: string) => void;
    onEdit: (taskId: string, newText: string) => void;
}

export function TaskItem(props: TaskItemProps){
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(props.task.text);


const handleSave = () => {
        props.onEdit(props.task.id, editValue);
        setIsEditing(false);
    }


return (
    <div className="flex items-center justify-between w-full mb-3">
        
        {/* LEFT PART */}
        <div className="flex items-center gap-3">
            <Checkbox 
                isSelected={props.task.isDone} 
                onChange={() => props.onToggle(props.task.id)}
            >
                <Checkbox.Content>
                    <Checkbox.Control>
                        <Checkbox.Indicator />
                    </Checkbox.Control>
                </Checkbox.Content>
            </Checkbox>

            {isEditing ? (
                <Input 
                    type="text" 
                    value={editValue} 
                    onChange={(e) => setEditValue(e.target.value)} 
                />
            ) : (
                <span className={props.task.isDone ? "line-through opacity-50" : ""}>
                    {props.task.text}
                </span>
            )}
        </div>


        {/* RIGHT PART */}
        <div className="flex items-center gap-2">
            {props.task.coordinates && (
                <Chip variant="secondary">
                    {props.task.coordinates.x}, {props.task.coordinates.y}, {props.task.coordinates.z}
                </Chip>
            )}

            {isEditing ? (
                <Button onClick={handleSave}>Save</Button>
            ) : (
                <Button onClick={() => setIsEditing(true)}>Edit</Button>
            )}
            
            <Button onClick={() => props.onDelete(props.task.id)}>Delete</Button>
        </div>

    </div>
    );
}