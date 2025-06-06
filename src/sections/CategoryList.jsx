import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import './Sections.css';

const categories = ['СОБИРАЊЕ', 'ОДЗЕМАЊЕ', 'МНОЖЕЊЕ', 'ДЕЛЕЊЕ', 'СПОРЕДБА', 'БРОЕЊЕ']; // 'ПРОНАЈДИ Х',

function CategoryList() {
    const [rotationAngles, setRotationAngles] = useState([]);

    useEffect(() => {
        const newAngles = categories.map(() => Math.floor(Math.random() * (13 - (-13) + 1)) + (-13));
        setRotationAngles(newAngles);
    }, []);

    return (
        <div className="categories">
            <ul>
                {categories.map((category, index) => (
                    <li key={index} style={{ transform: `rotate(${rotationAngles[index] || 0}deg)` }}>
                        <Link to={`/platform/${category}`}><button>{category}</button></Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CategoryList;
