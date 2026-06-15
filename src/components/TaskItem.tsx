import type { Task } from '../types';
import { useState } from 'react';


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
            <input type="checkbox" checked={props.task.isDone} onChange={() => props.onToggle(props.task.id)} />

            {isEditing ? (
                <>
                    <input type="text" value={editValue} onChange={(e) => setEditValue(e.target.value)} />
                    <button onClick={handleSave}>Save</button>
                </>
            ) : (
                <>
                    <span>{props.task.text}</span>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                </>
            )}

            {props.task.coordinates && (
                <small>
                    {` [${props.task.coordinates.x}, ${props.task.coordinates.y}, ${props.task.coordinates.z}]`},
                </small>
            )}
            <button onClick={() => props.onDelete(props.task.id)}>Delete</button>
        </div>
    );
}