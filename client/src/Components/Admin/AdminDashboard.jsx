import React, { useState } from 'react';
import axios from 'axios';

function AdminDashboard() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [quiz, setQuiz] = useState('');
    const [discussion, setDiscussion] = useState('');

    const addMaterial = () => {
        axios.post('http://localhost:5000/api/add-material', {
            title,
            content,
            quiz,
            discussion
        }).then(res => {
            alert('Material added successfully');
            setTitle('');
            setContent('');
            setQuiz('');
            setDiscussion('');
        });
    };

    return (
        <div>
            <h2>Add Learning Material</h2>
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
            <textarea placeholder="Quiz (JSON format)" value={quiz} onChange={(e) => setQuiz(e.target.value)} />
            <textarea placeholder="Discussion" value={discussion} onChange={(e) => setDiscussion(e.target.value)} />
            <button onClick={addMaterial}>Add Material</button>
        </div>
    );
}

export default AdminDashboard;
