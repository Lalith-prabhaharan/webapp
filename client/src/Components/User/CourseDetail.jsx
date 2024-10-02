import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect,useState } from 'react';
import "../../styles/coursedetail.css"
import { Sidebar } from './Sidebar';

export const CourseDetail = () => {
    const { courseId } = useParams(); // Get the courseId from URL
    const [course, setCourse] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        // console.log(courseId)
        setStartTime(Date.now());
        const fetchCourseData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/courses/course/${courseId}`);
                setCourse(response.data[0]);
                console.log(response.data[0])
            } catch (error) {
                console.error('Error fetching course data:', error);
            }
        };

        fetchCourseData();
        
    }, []);

    const submitQuiz= () =>{
        const endTime = Date.now(); // Get the end time
        const timeSpent = Math.round((endTime - startTime) / 60000);
        navigate(`/quiz/${courseId}`,{ state: { timeSpent } })
    }

    if (!course) return <p>Loading course data...</p>;
    return (
        <div className='main-container'>
            <Sidebar/>
        <main className="main-content" >
        <div className="course-learning-page">
            <div className="course-header">
                <h1 className="course-title">{course.name}</h1>
                <p className="course-description"><b>Pre-Requisite:</b> {course.prerequisites}</p>
            </div>

            <div className="blog-content">
                <h2 className="blog-heading">Blog</h2>
                <div dangerouslySetInnerHTML={{ __html: course.blogContent }} />
            </div>

            <div className="quiz-feedback-section">
                <h2 className="quiz-heading">Take the Quiz</h2>
                <button onClick={submitQuiz} className="quiz-button" >
                    Start Quiz
                </button>

                <h2 className="feedback-heading">Feedback</h2>
                <p className="feedback-description">
                    We value your feedback! Please let us know your thoughts about this course.
                </p>
                <Link to={`/feedback/${course.courseId}`} className="feedback-link">
                    Give Feedback
                </Link>
            </div>
        </div>
        </main>
        </div>
    );
};