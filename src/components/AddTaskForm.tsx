import { useState } from 'react';
import { CATEGORIES } from '../types';

import { Input, Button, Select, ListBox } from "@heroui/react";


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
        <form 
        onSubmit={handleSubmit} 
        style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
            
            <Input 
                type="text" 
                placeholder="What to do?" 
                value={text} 
                onChange={(e) => setText(e.target.value)}
            />

            <Input type="number" placeholder="x" value={x} onChange={(e) => setX(e.target.value)} style={{ width: '60px' }} />
            <Input type="number" placeholder="y" value={y} onChange={(e) => setY(e.target.value)} style={{ width: '60px' }} />
            <Input type="number" placeholder="z" value={z} onChange={(e) => setZ(e.target.value)} style={{ width: '60px' }} />


            <Select 
                placeholder="No category"
                value={categoryId === '' ? null : categoryId}
                onChange={(val) => setCategoryId(val !== null ? String(val) : '')}
                className="w-32"
            >
                <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                </Select.Trigger>
                
                <Select.Popover>
                    <ListBox>
                        <ListBox.Item id="" textValue="No category" className="text-gray-700">No category</ListBox.Item>
                        
                        {CATEGORIES.map((cat) => (
                            <ListBox.Item key={cat.id} id={cat.id} textValue={cat.name} className="text-gray-700">
                                {cat.name}
                            </ListBox.Item>
                        ))}
                    </ListBox>
                </Select.Popover>
            </Select>


            <Button type="submit">Add</Button>
        </form>
    );
}