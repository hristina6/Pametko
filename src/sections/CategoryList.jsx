import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import './Sections.css';

<<<<<<< HEAD
const categories = ['СОБИРАЊЕ', 'ОДЗЕМАЊЕ', 'МНОЖЕЊЕ', 'ДЕЛЕЊЕ'];
=======
const categories = ['SUM', 'SUBTRACT', 'MULTIPLY', 'DIVIDE'];
>>>>>>> 81776d2 (Adding import, local data base and server)

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
                        <Link to="/platform"><button>{category}</button></Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CategoryList;
