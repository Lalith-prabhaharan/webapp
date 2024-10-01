import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LearningMaterial({ match }) {
    const [material, setMaterial] = useState(null);
    const [quizVisible, setQuizVisible] = useState(false);
    const [feedbackVisible, setFeedbackVisible] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/materials`)
            .then(res => setMaterial(res.data.find(m => m.id === parseInt(match.params.id))))
            .catch(err => console.error(err));

        // Check if blog is completed
        const userId = 1;  // Replace with logged-in user ID
        axios.get(`http://localhost:5000/api/check-completion/${userId}/${match.params.id}`)
            .then(res => {
                if (res.data.completed) {
                    setQuizVisible(true);
                    setFeedbackVisible(true);
                }
            });
    }, [match.params.id]);

    const completeBlog = () => {
        const userId = 1;  // Replace with logged-in user ID
        axios.post('http://localhost:5000/api/complete-blog', {
            userId,
            materialId: match.params.id
        }).then(() => {
            setQuizVisible(true);
            setFeedbackVisible(true);
        });
    };

    return (
        <div>
            {material && (
                <>
                    <h2>{material.title}</h2>
                    <div dangerouslySetInnerHTML={{ __html: material.content }} />

                    <button onClick={completeBlog}>Complete Blog</button>

                    {quizVisible && (
                        <div>
                            <h3>Quiz</h3>
                            {/* Quiz component here */}
                        </div>
                    )}

                    {feedbackVisible && (
                        <div>
                            <h3>Feedback</h3>
                            {/* Feedback form here */}
                        </div>
                    )}

                    <div>
                        <h3>Discussion</h3>
                        <p>{material.discussion}</p>
                    </div>
                </>
            )}
        </div>
    );
}

export default LearningMaterial;
