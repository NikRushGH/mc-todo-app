import type { Task } from '../types';


interface TaskItemProps {
    task: Task;
    onToggle: (taskId: string) => void;
    onDelete: (taskId: string) => void;
}

export function TaskItem(props: TaskItemProps){
    return (
        <div>
            <input type="checkbox" checked={props.task.isDone} onChange={() => props.onToggle(props.task.id)} />

            <span>{props.task.text}</span>

            {props.task.coordinates && (
                <small>
                    {/* {' '} */}
                    {` [${props.task.coordinates.x}, ${props.task.coordinates.y}, ${props.task.coordinates.z}]`},
                </small>
            )}
            <button onClick={() => props.onDelete(props.task.id)}>Delete</button>
        </div>
    );
}