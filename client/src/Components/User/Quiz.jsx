// components/Quiz.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Quiz = ({ courseId }) => {
    const [quiz, setQuiz] = useState(null);
    const [responses, setResponses] = useState({});

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await axios.get(`/api/quiz/${courseId}`);
                setQuiz(response.data);
            } catch (error) {
                console.error('Error fetching quiz:', error);
            }
        };

        fetchQuiz();
    }, [courseId]);

    const handleChange = (questionIndex, value) => {
        setResponses(prevResponses => ({
            ...prevResponses,
            [questionIndex]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Here you can handle the submission of answers
        console.log('Submitted responses:', responses);
        // You may want to calculate the score based on correct answers
    };

    if (!quiz) return <p>Loading quiz...</p>;

    return (
        <form onSubmit={handleSubmit}>
            <h2>Quiz for Course</h2>
            {quiz.questions.map((q, index) => (
                <div key={index}>
                    <h4>{q.questionText}</h4>
                    {q.options.map((option, optIndex) => (
                        <div key={optIndex}>
                            <label>
                                <input
                                    type="radio"
                                    name={`question_${index}`}
                                    value={option}
                                    onChange={() => handleChange(index, option)}
                                />
                                {option}
                            </label>
                        </div>
                    ))}
                </div>
            ))}
            <button type="submit">Submit Quiz</button>
        </form>
    );
};

export default Quiz;
