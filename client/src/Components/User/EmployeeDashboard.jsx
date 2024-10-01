import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function EmployeeDashboard() {
    const [materials, setMaterials] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/materials')
            .then(res => setMaterials(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h2>Learning Materials</h2>
            <ul>
                {materials.map(material => (
                    <li key={material.id}>
                        <Link to={`/material/${material.id}`}>{material.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default EmployeeDashboard;
