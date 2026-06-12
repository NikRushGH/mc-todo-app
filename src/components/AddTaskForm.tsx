import { useState } from 'react';
import { CATEGORIES } from '../types';


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
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
            <input 
                type="text" 
                placeholder="What to do?" 
                value={text} 
                onChange={(e) => setText(e.target.value)}
            />

            <input type="number" placeholder="x" value={x} onChange={(e) => setX(e.target.value)} style={{ width: '60px' }} />
            <input type="number" placeholder="y" value={y} onChange={(e) => setY(e.target.value)} style={{ width: '60px' }} />
            <input type="number" placeholder="z" value={z} onChange={(e) => setZ(e.target.value)} style={{ width: '60px' }} />

            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                <option value="">No category</option>
                {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                        {cat.name}
                    </option>
                ))}
            </select>


            <button type="submit">Add</button>
        </form>
    );
}