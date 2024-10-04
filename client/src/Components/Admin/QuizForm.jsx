import React, { useState } from 'react';
import axios from 'axios';
import "../../styles/quizform.css"
import { Sidebar } from '../User/Sidebar';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
const QuizForm = () => {
    const navigate = useNavigate();
    const {courseId} = useParams();
    const [quiz, setQuiz] = useState({courseId: courseId,
        questions:[
        {questionText: '', options: ['', ''], answer: '' }
    ]});

    const handleQuestionChange = (index, e) => {
        const { name, value } = e.target;
        const updatedQuestions = [...quiz.questions];
        updatedQuestions[index][name] = value;
        setQuiz((prevQuiz) => ({
            ...prevQuiz,
            questions: updatedQuestions,
        }));
    };

    const handleOptionChange = (questionIndex, optionIndex, value) => {
        const updatedQuestions = [...quiz.questions];
        updatedQuestions[questionIndex].options[optionIndex] = value;
        setQuiz((prevQuiz) => ({
            ...prevQuiz,
            questions: updatedQuestions,
        }));
    };

    const addQuestion = () => {
    setQuiz((prevQuiz) => ({
        ...prevQuiz,
        questions: [...prevQuiz.questions, { questionText: '', options: ['', ''], answer: '' }],
    }));
    };

    const deleteQuestion = (index) => {
        setQuiz((prevQuiz) => ({
            ...prevQuiz,
            questions: prevQuiz.questions.filter((_, i) => i !== index),
        }));
    };
    
    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(quiz);
        const response = await axios.post('http://localhost:8000/api/quiz', quiz, {headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }});
        if (response.status === 201) {
            // Reset the form if needed
            navigate(-1)
            toast.success("Quiz Created")
            setQuiz({
                courseId: 1, // Or reset to the appropriate courseId
                questions: [{ questionText: '', options: ['', '', ''], answer: '' }]
            });
        } else {
            throw new Error("Failed to create quiz");
        }
    } catch (error) {
        console.error('Error creating quiz:', error);
    }
    };

    return (
    <div className="main-container">
    <Sidebar />
    <div className="quiz-form-container">
        <form onSubmit={handleSubmit} className="quiz-form">
            {quiz.questions.map((q, index) => (
                <div key={index} className="quiz-question">
                    <h4 className="question-title">Question {index + 1}</h4>
                    <input
                        type="text"
                        name="questionText"
                        className="question-input"
                        placeholder="Question"
                        value={q.questionText}
                        onChange={(e) => handleQuestionChange(index, e)}
                    />
                    {q.options.map((option, optIndex) => (
                        <input
                            key={optIndex}
                            type="text"
                            className="question-option-input"
                            placeholder={`Option ${optIndex + 1}`}
                            value={option}
                            onChange={(e) => handleOptionChange(index, optIndex, e.target.value)}
                        />
                    ))}
                    <input
                        type="text"
                        name="answer"
                        className="answer-input"
                        placeholder="Correct Answer"
                        value={q.answer}
                        onChange={(e) => handleQuestionChange(index, e)}
                    />
                    <button
                        type="button"
                        className="delete-question-button"
                        onClick={() => deleteQuestion(index)}
                    >
                        Delete Question
                    </button>
                </div>
            ))}
            <button type="button" onClick={addQuestion} className="add-question-button">Add Question</button>
            <button type="submit" className="create-quiz-button">Create Quiz</button>
        </form>
    </div>
</div>

    );
};

export default QuizForm;
