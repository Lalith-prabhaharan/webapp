import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import "../../styles/courselist.css";
import 'primeicons/primeicons.css';
import { AdminSidebar } from './AdminSidebar';
import { useNavigate } from 'react-router-dom';

export const AdminCourseList = () => {
    const [courses, setCourses] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [quizzes, setQuizzes] = useState([]);
    const toast = useRef(null);
    const navigate = useNavigate();

    const fetchCourses = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/courses');
            setCourses(res.data);
            setFilteredCourses(res.data);
        } catch (err) {
            console.error("Error fetching courses:", err);
        }
    };

    const fetchQuizzes = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/quiz/');
            setQuizzes(res.data);
        } catch (err) {
            console.error("Error fetching quizzes:", err);
        }
    };

    const quizExistsForCourse = (courseId) => {
        return quizzes.some((quiz) => quiz.courseId === courseId);
    };

    useEffect(() => {
        fetchCourses();
        fetchQuizzes();
    }, []);

    useEffect(() => {
        filterCourses(searchText);
    }, [searchText, courses]);

    const handleInputChange = (event) => {
        const val = event.target.value.toLowerCase();
        setSearchText(val);
    };

    const filterCourses = (searchValue) => {
        const filtered = courses.filter((course) => {
            return (
                course.name.toLowerCase().includes(searchValue)
            );
        });
        setFilteredCourses(filtered);
    };

    const handleQuizNavigation = (courseId) => {
        navigate(`/create-quiz/${courseId}`);
    };

    const buttons = (course) => {
        return (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                {!quizExistsForCourse(course.courseId) ? (
                <Button label="Create Quiz" onClick={() => handleQuizNavigation(course.courseId)} />
                ) : (
                    <span>Quiz Already Created</span>
                )}
                </div>
        );
    };

    return (
        <div className='dashboard-container'>
            <AdminSidebar title="Courses" />
            <main className="main-content">
                <header className="dashboard-header">
                <h1>Courses</h1>
                <div className="user-info">
                    <span> <b>Hii!!</b></span>
                </div>
                </header>
                <Toast ref={toast} />
                <InputText
                    type="text"
                    style={{ width: '20%', padding: '10px 20px', borderRadius: '10px', marginTop: '25px', marginBottom: '10px' }}
                    value={searchText}
                    onChange={handleInputChange}
                    placeholder="Search Course Name..."
                />
                <DataTable removableSort showGridlines stripedRows paginator rows={10} value={filteredCourses} className='pending'>
                    <Column field="name" sortable header="Course Name"></Column>
                    <Column field="est_duration" style={{ width: "20%" }} sortable header="Estimated Duration"></Column>
                    <Column field="postedby" style={{ width: "20%" }} sortable header="Posted By"></Column>
                    <Column field="stack" style={{ width: "20%" }} sortable header="Stack"></Column>
                    <Column alignHeader={'center'} body={buttons} style={{ width: "20%" }} header="Actions"></Column>
                </DataTable>
            </main>
        </div>
    );
};
