// components/Quiz.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import "../../styles/quizanswer.css"
import { Sidebar } from './Sidebar';
import { toast } from 'react-toastify';

const Quiz = () => {
    const navigate = useNavigate();     
    const { courseId } = useParams();
    const location = useLocation();
    const { timeSpent } = location.state;
    const [quiz, setQuiz] = useState(null);
    const [responses, setResponses] = useState({courseId:courseId,submittedAnswers:[]});

    useEffect(() => {
        const fetchQuiz = async () => {
            try {                
                const response = await axios.get(`http://localhost:8000/api/quiz/${courseId}`, {headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }});
                setQuiz(response.data);
                console.log(quiz);
                
            } catch (error) {
                console.error('Error fetching quiz:', error);
            }
        };

        fetchQuiz();
    }, [courseId]);

    const handleChange = (questionIndex, value) => {
        setResponses(prevResponses => {
            const updatedAnswers = [...prevResponses.submittedAnswers];
            // If this questionIndex already exists, update it, otherwise add it
            updatedAnswers[questionIndex] = value;
            // Return the updated state with courseId unchanged, and updated answers
            return {
                ...prevResponses,
                submittedAnswers: updatedAnswers
            };
        })
    };

    const handleSubmit = async(event) => {
        event.preventDefault();
        // Here you can handle the submission of answers
        console.log('Submitted responses:', responses);
        try {
            console.log(quiz);
            const quizResponse = await axios.post('http://localhost:8000/api/quiz/submit', responses, {headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }});
            if (quizResponse.status === 200) {
                // setQuiz({
                //     courseId: '', 
                //     submittedAnswers:[]
                // });
                // console.log(quizResponse.data.score)
                toast.success("Submitted Successfully")
                const  correctAnswers  = quizResponse.data.score;
                const engagementData = {
                    userId: localStorage.getItem("id"),  // Get the logged-in user's ID
                    courseEngagements: [
                        {
                            courseId: responses.courseId,
                            score: correctAnswers,  // Number of correct answers
                            timeSpent: timeSpent  // Set timeSpent here if you've tracked it
                        }
                    ]
                };
                navigate(-1);
                console.log(engagementData)
                const engagementResponse = await axios.post('http://localhost:8000/api/engagement/', engagementData, {headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }});
                if (engagementResponse.status === 200) {
                    console.log('Engagement data saved successfully:', engagementResponse.data);
                } else {
                    throw new Error("Failed to store engagement data");
                }

            } else {
                throw new Error("Failed to create quiz");
            }
        } catch (error) {
            console.error('Error creating quiz:', error);
        }
    };

    if (!quiz) return <p>Loading quiz...</p>;

    return (
        <div className='main-container'>
            <Sidebar/>
            <div className="quiz-answer-container">
        <form onSubmit={handleSubmit} className="quiz-form">
            <h2 className="quiz-title">Quiz for Course</h2>
            {quiz.questions.map((q, index) => (
                <div key={index} className="quiz-question-block">
                    <h4 className="question-text">{q.questionText}</h4>
                    {q.options.map((option, optIndex) => (
                        <div key={optIndex} className="option-block">
                            <label className="option-label">
                                <input
                                    type="radio"
                                    name={`question_${index}`}
                                    value={option}
                                    onChange={() => handleChange(index, option)}
                                    className="option-input"
                                />
                                {option}
                            </label>
                        </div>
                    ))}
                </div>
            ))}
            <button type="submit" className="submit-btn">Submit Quiz</button>
        </form>
        </div>
        </div>
    );
};

export default Quiz;
