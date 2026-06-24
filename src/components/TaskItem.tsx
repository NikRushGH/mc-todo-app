import type { Task } from '../types';
import { useState } from 'react';
import { CATEGORIES } from '../types';

import { Input, Button, Chip, Checkbox, TextField, TextArea, Select, ListBox } from "@heroui/react";
import { Pencil, TrashBin, Check } from '@gravity-ui/icons';


interface TaskItemProps {
    task: Task;
    onToggle: (taskId: string) => void;
    onDelete: (taskId: string) => void;
    onEdit: (taskId: string, newText: string, newCoords?: { x: number; y: number; z: number }, newCategoryId?: string) => void;
}

export function TaskItem(props: TaskItemProps){
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(props.task.text);

    const [editX, setEditX] = useState(props.task.coordinates?.x?.toString() || '');
    const [editY, setEditY] = useState(props.task.coordinates?.y?.toString() || '');
    const [editZ, setEditZ] = useState(props.task.coordinates?.z?.toString() || '');
    const [editCategoryId, setEditCategoryId] = useState(props.task.categoryId || '');

    const taskCategory = CATEGORIES.find(c => c.id === props.task.categoryId);


const handleSave = () => {
        let coords;
        if (editX !== '' || editY !== '' || editZ !== '') {
            coords = { 
                x: Number(editX) || 0, 
                y: Number(editY) || 0, 
                z: Number(editZ) || 0 
            };
        }

        const finalCategoryId = editCategoryId === '' ? undefined : editCategoryId;

        props.onEdit(props.task.id, editValue, coords, finalCategoryId);
        setIsEditing(false);
    }


    return (
        <div className="flex items-start justify-between w-full mb-3 gap-4">
            
            {/* LEFT PART */}
            <div className="flex items-start gap-3 w-full">
                <Checkbox 
                    isSelected={props.task.isDone} 
                    onChange={() => props.onToggle(props.task.id)}
                    className="mt-1"
                >
                    <Checkbox.Content>
                        <Checkbox.Control>
                            <Checkbox.Indicator/>
                        </Checkbox.Control>
                    </Checkbox.Content>
                </Checkbox>

                {isEditing ? (
                    <TextField className="w-full">
                        <TextArea 
                            value={editValue} 
                            onChange={(e) => {
                                setEditValue(e.target.value);
                                e.target.style.height = 'auto';
                                e.target.style.height = `${e.target.scrollHeight}px`;
                            }}
                            ref={(el) => {
                                if (el) {
                                    el.style.height = 'auto';
                                    el.style.height = `${el.scrollHeight}px`;
                                }
                            }}
                            className="resize-none overflow-hidden bg-white/50 text-slate-700 border border-white/40 shadow-sm"
                        />
                    </TextField>
                ) : (
                    <span className={`break-words ${props.task.isDone ? "line-through text-slate-400" : ""}`}>
                        {props.task.text}
                    </span>
                )}
            </div>


            {/* RIGHT PART */}
            <div className="flex items-start gap-2 shrink-0">
                
                <div className="flex flex-col items-end justify-start shrink-0 min-h-[32px] gap-1.5 pt-1/2">
                    

                    {isEditing ? (
                        <div className="flex gap-1">
                            <Input 
                            type="number" 
                            placeholder="X" 
                            value={editX} 
                            onChange={(e) => setEditX(e.target.value)} 
                            className="bg-white/50 text-slate-700 border border-white/40 shadow-sm text-[0.9rem] w-15 px-2 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />

                            <Input 
                            type="number" 
                            placeholder="Y" 
                            value={editY} 
                            onChange={(e) => setEditY(e.target.value)} 
                            className="bg-white/50 text-slate-700 border border-white/40 shadow-sm text-[0.9rem] w-15 px-2 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />

                            <Input 
                            type="number" 
                            placeholder="Z" 
                            value={editZ} 
                            onChange={(e) => setEditZ(e.target.value)} 
                            className="bg-white/50 text-slate-700 border border-white/40 shadow-sm text-[0.9rem] w-15 px-2 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                        </div>
                    ) : (
                        props.task.coordinates && (
                            <Chip variant="secondary" className="bg-white/50 text-slate-600 border border-white/40 shadow-sm">
                                {props.task.coordinates.x}, {props.task.coordinates.y}, {props.task.coordinates.z}
                            </Chip>
                        )
                    )}


                    {isEditing ? (
                        <Select 
                            aria-label="Category"
                            placeholder="No category"
                            value={editCategoryId === '' ? null : editCategoryId}
                            onChange={(val) => setEditCategoryId(val !== null ? String(val) : '')}
                            className="w-[235px] shrink-0"
                        >
                            <Select.Trigger className="bg-white/50 border border-white/40 shadow-sm h-10 min-h-10 rounded-xl flex items-center">
                                <Select.Value className="text-slate-600 text-sm" />
                                <Select.Indicator className="text-slate-500" />
                            </Select.Trigger>
                            
                            <Select.Popover className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-xl">
                                <ListBox className="bg-transparent p-1">
                                    <ListBox.Item id="" textValue="No category" className="text-slate-700 hover:bg-white/90">No category</ListBox.Item>
                                    {CATEGORIES.map((cat) => (
                                        <ListBox.Item 
                                            key={cat.id} 
                                            id={cat.id} 
                                            textValue={cat.name} 
                                            className="text-slate-700 hover:bg-white/90"
                                        >   
                                            {/* COLOR DOT */}
                                            <div className="flex items-center gap-2">
                                                <span 
                                                    className="w-2 h-2 rounded-full shrink-0" 
                                                    style={{ backgroundColor: cat.color }} 
                                                />
                                                {cat.name}
                                            </div>
                                        </ListBox.Item>
                                    ))}
                                </ListBox>
                            </Select.Popover>
                        </Select>
                    ) : (
                        taskCategory && (
                            <Chip 
                                variant="secondary" 
                                size="md" 
                                className="bg-white/50 text-slate-600 border border-white/40 shadow-sm text-xs flex items-center gap-1.5"
                            >
                                <span 
                                    className="w-1.5 h-1.5 rounded-full shrink-0" 
                                    style={{ backgroundColor: taskCategory.color }} 
                                />
                                {taskCategory.name}
                            </Chip>
                        )
                    )}
                </div>

                {/* BUTTONS */}
                <div className="flex gap-1 shrink-0 -mt-1">
                    {isEditing ? (
                        <Button isIconOnly variant="ghost" className="text-emerald-600 border-transparent hover:bg-emerald-100/50 items-start" onClick={handleSave}>
                            <Check width={20} />
                        </Button>
                    ) : (
                        <Button isIconOnly variant="ghost" className="text-slate-500 border-transparent hover:text-slate-800 hover:bg-slate-200/50" onClick={() => setIsEditing(true)}>
                            <Pencil width={20} />
                        </Button>
                    )}
                    
                    <Button isIconOnly variant="ghost" className="text-slate-500 border-transparent hover:text-slate-800 hover:bg-danger/30" onClick={() => props.onDelete(props.task.id)}>
                        <TrashBin width={20} />
                    </Button>
                </div>
            </div>

        </div>
    );
}