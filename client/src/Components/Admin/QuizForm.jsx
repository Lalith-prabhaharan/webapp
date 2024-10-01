import React, { useState } from 'react';
import "../../styles/quizform.css"
import { Sidebar } from '../User/Sidebar';
const QuizForm = () => {
    const [questions, setQuestions] = useState([
        { questionText: '', options: ['', ''], answer: '' }
    ]);

    const handleQuestionChange = (index, e) => {
        const { name, value } = e.target;
        const updatedQuestions = [...questions];
        updatedQuestions[index][name] = value;
        setQuestions(updatedQuestions);
    };

    const handleOptionChange = (questionIndex, optionIndex, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options[optionIndex] = value;
        setQuestions(updatedQuestions);
    };

    const addQuestion = () => {
        setQuestions([...questions, { questionText: '', options: ['', ''], answer: '' }]);
    };

    const deleteQuestion = (index) => {
        setQuestions((prevQuestions) => prevQuestions.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to handle quiz submission
        console.log(questions);
    };

    return (
        <div className="main-container">
    <Sidebar />
    <div className="quiz-form-container">
        <form onSubmit={handleSubmit} className="quiz-form">
            {questions.map((q, index) => (
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
                            className="option-input"
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
                    {/* Delete Question Button */}
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
