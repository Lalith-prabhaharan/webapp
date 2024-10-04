import React from "react";
import axios from "axios";
import { useState } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Sidebar } from "./Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
export const Feedback = () =>{
    const {courseId} = useParams();
    const navigate = useNavigate();
    const [feedback, setFeedback] = useState({
        rating: '',           // Rating (1-5)
        difficulty: '',       // Difficulty (Easy, Medium, Hard)
        comments: '',         // Optional comments
        interactive: ''       // Interactive (Yes/No)
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target ? e.target : e;
        setFeedback({
            ...feedback,
            [name]: value
        });
    };
    
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // Create the feedback object
        const feedbackData = {
            userId: localStorage.getItem("id"),         // Employee ID (or you can get it from localStorage or state if required)
            courseId:courseId,     // Course ID
            rating: feedback.rating,         // Rating for the course (1-5)
            difficulty: feedback.difficulty, // Difficulty level (Easy, Medium, Hard)
            comments: feedback.comments,     // Optional comments, max length 500
            interactive: feedback.interactive // Whether the course was interactive (Yes/No)
        };
    
        console.log('Feedback Data:', feedbackData);
    
        try {
            // Send the feedback data to the API via POST request
            const response = await axios.post('http://localhost:8000/api/feedback/add', feedbackData);
    
            if (response.status === 201) {
                toast.success("Feedback Saved Successfully")
                // console.log('Feedback submitted successfully', response.data);
                navigate(-1);
            } else {
                throw new Error('Failed to submit feedback');
            }
        } catch (error) {
            console.error('Error submitting feedback:', error);
            // Handle error (e.g., show error notification)
        }
    };
    

    return(
    <div className="dashboard-container">
    <Sidebar title="AddFeedback" />
    <main className="main-content">
        <header className="dashboard-header">
            <h1>Add Feedback</h1>
            <div className="user-info">
                <span><b>Hii !!</b></span>
            </div>
        </header>
        <div className="add-feedback-container">
            <Card title="Submit Feedback" className="add-feedback-card">
                <form onSubmit={handleSubmit} className="form-two-columns">
                    <div className="form-column">
                        <div className="p-field">
                            <label htmlFor="rating">Rating</label>
                            <p>Min:1 and Max:5</p>
                            <InputText
                                id="rating"
                                name="rating"
                                type="number"
                                value={feedback.rating}
                                onChange={handleChange}
                                min={1}
                                max={5}
                                required
                            />
                        </div>
                        <div className="p-field">
                            <label htmlFor="difficulty">Difficulty</label>
                            <Dropdown
                                id="difficulty"
                                name="difficulty"  // Make sure to add the name attribute here
                                value={feedback.difficulty}
                                options={[
                                    { label: 'Easy', value: 'Easy' },
                                    { label: 'Medium', value: 'Medium' },
                                    { label: 'Hard', value: 'Hard' }
                                ]}
                                onChange={(e) => handleChange({ name: 'difficulty', value: e.value })}
                                optionLabel="label"
                                placeholder="Select Difficulty"
                                required
                            />
                        </div>

                    </div>
                    <div className="form-column">
                        <div className="p-field">
                            <label htmlFor="comments">Comments</label>
                            <textarea
                                id="comments"
                                name="comments"
                                value={feedback.comments}
                                onChange={handleChange}
                                maxLength={500}
                                rows={3}
                                placeholder="Enter your comments (optional)"
                            />
                        </div>
                        <div className="p-field">
                            <label htmlFor="interactive">Was the course interactive?</label>
                            <Dropdown
                                id="interactive"
                                name="interactive"  // Add name attribute here
                                value={feedback.interactive}
                                options={[
                                    { label: 'Yes', value: 'Yes' },
                                    { label: 'No', value: 'No' }
                                ]}
                                onChange={(e) => handleChange({ name: 'interactive', value: e.value })} // Updated onChange
                                optionLabel="label"
                                placeholder="Select an option"
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            label="Submit Feedback"
                            className="p-button-success"
                        />
                    </div>
                </form>
            </Card>
        </div>
    </main>
</div>

    )
}