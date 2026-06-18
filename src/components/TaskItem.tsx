import type { Task } from '../types';
import { useState } from 'react';

import { Input, Button, Chip } from "@heroui/react";


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
        <div>
            <Input type="checkbox" checked={props.task.isDone} onChange={() => props.onToggle(props.task.id)} />

            {isEditing ? (
                <>
                    <Input type="text" value={editValue} onChange={(e) => setEditValue(e.target.value)} />
                    <Button onClick={handleSave}>Save</Button>
                </>
            ) : (
                <>
                    <span>{props.task.text}</span>
                    <Button onClick={() => setIsEditing(true)}>Edit</Button>
                </>
            )}

            {props.task.coordinates && (
                <Chip>
                    {` ${props.task.coordinates.x}, ${props.task.coordinates.y}, ${props.task.coordinates.z}`}
                </Chip>
            )}
            <Button onClick={() => props.onDelete(props.task.id)}>Delete</Button>
        </div>
    );
}