import React, { useState, useEffect } from "react";
import axios from "axios";
import { Course } from "./Course";
import "../../styles/courselist.css";

export const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [completedCourses, setCompletedCourses] = useState([]);
    const userId = localStorage.getItem("id"); // Get user ID from local storage or context

    const fetchCourses = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/courses/");
            setCourses(res.data);
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };

    const checkIfCourseCompleted = async (courseId) => {
        try {
            const res = await axios.get("http://localhost:8000/api/feedback/check", {
                params: {
                    courseId,
                    userId,
                },
            });

            // Return true if feedback exists, meaning the course is completed
            return !!res.data;
        } catch (error) {
            if (error.response && error.response.status === 404) {
                return false; // Course not completed
            } else {
                console.error("Error checking course completion:", error);
                return false; // Assume not completed on error
            }
        }
    };

    const fetchCompletedCourses = async () => {
        try {
            const completed = await Promise.all(
                courses.map(async (course) => {
                    const isCompleted = await checkIfCourseCompleted(course.courseId);
                    return isCompleted ? course : null;
                })
            );
            setCompletedCourses(completed.filter((course) => course !== null));
        } catch (error) {
            console.error("Error fetching completed courses:", error);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    useEffect(() => {
        if (courses.length > 0) {
            fetchCompletedCourses();
        }
    }, [courses]);

    return (
        <div>
            <h1>Course List:</h1>
            <div className="course-grid">
                {courses.length > 0 ? (
                courses.map(course => (
                    <div key={course.courseId}>
                    <Course course={course} />
                    </div>
                ))
                ) : (
                <p>No Courses to display</p>
                )}
            </div>
            <h1>Completed Courses:</h1>
            <div className="course-grid">
                {completedCourses.length > 0 ? (
                    completedCourses.map((course) => (
                        <div key={course.courseId}>
                            <Course course={course} />
                        </div>
                    ))
                ) : (
                    <p>No Completed Courses to display</p>
                )}
            </div>
        </div>
    );
};
