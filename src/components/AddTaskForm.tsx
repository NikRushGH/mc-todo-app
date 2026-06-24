import { useState } from 'react';
import { CATEGORIES } from '../types';

import { Form, Input, Button, Select, ListBox } from "@heroui/react";
import { Plus } from '@gravity-ui/icons';


interface AddTaskFormProps {
    onAdd: (text: string, coordinates?: { x: number; y: number; z: number }, categoryId?: string) => void;
}

export function AddTaskForm(props: AddTaskFormProps) {
    const [text, setText] = useState('');

    const [x, setX] = useState('');
    const [y, setY] = useState('');
    const [z, setZ] = useState('');

    const [categoryId, setCategoryId] = useState('');


    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (text.trim() === '') return;

        let coords;
        if (x !== '' || y !== '' || z !== '') {
            coords = { 
                x: Number(x) || 0, 
                y: Number(y) || 0, 
                z: Number(z) || 0 
            };
        }

        const finalCategoryId = categoryId === '' ? undefined : categoryId;

        props.onAdd(text, coords, finalCategoryId);


        setText('');
        setX('');
        setY('');
        setZ('');
        setCategoryId('');
    };

    return (
        <Form 
            onSubmit={handleSubmit} 
            className="flex items-center gap-3 w-full bg-white/20 backdrop-blur-md border border-white/60 shadow-[0_3px_15px_5px_rgba(0,0,0,0.1)] rounded-2xl p-3"
        >
            
            <Input 
                type="text" 
                placeholder="Task name..." 
                value={text} 
                onChange={(e) => setText(e.target.value)}
                className="flex-1 bg-transparent border-none shadow-none text-[0.95rem] focus:outline-none focus:ring-0 text-slate-700"
            />

            <div className="flex items-center gap-2 shrink-0">
                <Input 
                    type="number" 
                    placeholder="X" 
                    value={x} 
                    onChange={(e) => setX(e.target.value)} 
                    className="h-10 bg-white/50 text-slate-700 placeholder:text-slate-400 border border-white/40 shadow-sm text-[0.9rem] w-15 px-2 text-center rounded-xl [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                />
                <Input 
                    type="number" 
                    placeholder="Y" 
                    value={y} 
                    onChange={(e) => setY(e.target.value)} 
                    className="h-10 bg-white/50 text-slate-700 placeholder:text-slate-400 border border-white/40 shadow-sm text-[0.9rem] w-15 px-2 text-center rounded-xl [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                />
                <Input 
                    type="number" 
                    placeholder="Z" 
                    value={z} 
                    onChange={(e) => setZ(e.target.value)} 
                    className="h-10 bg-white/50 text-slate-700 placeholder:text-slate-400 border border-white/40 shadow-sm text-[0.9rem] w-15 px-2 text-center rounded-xl [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                />
            </div>

            <Select 
                aria-label="Category"
                placeholder="No category"
                value={categoryId === '' ? null : categoryId}
                onChange={(val) => setCategoryId(val !== null ? String(val) : '')}
                className="w-36 shrink-0"
            >

                <Select.Trigger className="bg-white/50 border border-white/40 shadow-sm h-10 min-h-10 rounded-xl items-center">
                    <Select.Value className="text-slate-600 text-sm" />
                    <Select.Indicator className="text-slate-500 mt-3" />
                </Select.Trigger>
                
                <Select.Popover className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl">
                    <ListBox className="bg-transparent p-1">
                        
                        <ListBox.Item id="" textValue="No category" className="text-slate-700 hover:bg-white/90">
                            No category
                        </ListBox.Item>
                        
                        {CATEGORIES.map((cat) => (
                            <ListBox.Item key={cat.id} id={cat.id} textValue={cat.name} className="text-slate-700 hover:bg-white/90">
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


            <Button 
                type="submit" 
                isIconOnly 
                variant="ghost" 
                className="text-slate-400 border-transparent hover:text-slate-500 hover:bg-slate-300/60 rounded-full shrink-0"
            >
                <Plus className="w-5 h-5" />
            </Button>
            
        </Form>
    );
}