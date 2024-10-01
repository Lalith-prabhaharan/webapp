import React,{useState,useEffect} from "react";
import axios from "axios";
import { Course } from "./Course";
import "../../styles/courselist.css"
export const CourseList = () =>{
    const [courses, setCourses] = useState([]);
    const fetchCourses = async () =>{
        try{
            const res = await axios.get('http://localhost:8000/api/courses/');
            setCourses(res.data)
        }
        catch(error){
            console.error('Error fetching courses:', error);
        } 
    }
    useEffect(() => {
        fetchCourses();
    }, []);
    return (
        <div>
        <h1> Course List: </h1>
        {/* {error && <p className="error">Error: {error}</p>} Display error message */}
        <div className="course-grid">
            {/* <Course/>
            <Course/>
            <Course/>
            <Course/>
            <Course/>*/}
            {/* <Course/>  */}
            {courses.length >0 ?  courses.map(course => (
                <div>
                <Course key={course.courseId} course={course} />
                </div>
            ))
            :   <p> No Courses to display</p>}
        </div>
        </div>
    )
}