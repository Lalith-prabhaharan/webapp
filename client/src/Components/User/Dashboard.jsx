import React,{useEffect,useState} from 'react'
import "../../styles/dashboard.css"
import { Card } from 'primereact/card';
import 'primereact/resources/themes/saga-blue/theme.css';  
import 'primereact/resources/primereact.min.css';       
import axios from 'axios';
import { Sidebar } from './Sidebar';
import { Course } from './Course';
import { CourseList } from './CourseList';
import { NavBar } from './NavBar';

export const Dashboard = () => {
    const [totalProfit, setTotalProfit] = useState(0);
    const [totalCourses, setTotalCourses] = useState(0);
    const [completedCourses, setCompletedCourses] = useState(0);
    const [totalTimeSpent, setTotalTimeSpent] = useState(0);
    const [cumulativeQuizScore, setCumulativeQuizScore] = useState(0);
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Fetch courses and engagement data
                const courseResponse = await axios.get("http://localhost:8000/api/courses");
                const engagementResponse = await axios.get(`http://localhost:8000/api/engagement/get/${localStorage.getItem("id")}`);
    
                const coursesData = courseResponse.data;
                const engagementData = engagementResponse.data;
    
                // Calculate total courses
                // console.log(coursesData)
                setTotalCourses(coursesData.length);
                // Calculate completed courses
                const completedCoursesCount = engagementData.filter(engagement => 
                    engagement.score > 0 // Adjust condition based on your criteria for completed courses
                ).length;
                setCompletedCourses(completedCoursesCount);
    
                // Calculate total time spent and cumulative quiz score
                const timeSpent = engagementData.reduce((acc, engagement) => acc + engagement.timeSpent, 0);
                setTotalTimeSpent(timeSpent);
    
                const totalScore = engagementData.reduce((acc, engagement) => acc + engagement.score, 0);
                setCumulativeQuizScore(totalScore);
    
                // Calculate profit based on your business logic (this is an example)
                const profit = coursesData.reduce((acc, course) => acc + course.price, 0); // Assuming each course has a 'price' field
                setTotalProfit(profit);
    
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        };
    
        fetchDashboardData();
    }, []);
        
return (
    <div className='dashboard-container'>
    {/* <NavBar/> */}
    <Sidebar title="Dashboard" />
    <main className="main-content">
        <header className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="user-info">
            <span> <b>Hii!!</b></span>
        </div>
        </header>
        <div className="dashboard_card">
        <Card title="No. Of Courses">
            <p style={{color:"green"}} className="m-0">
            {totalCourses}
                </p>
        </Card>
        <Card title="Completed Courses">
            <p style={{color:"green"}} className="m-0">
                {completedCourses} 
            </p>
        </Card>
        <Card title="Total Time Spent">
            <p style={{color:"green"}}   className="m-0">
                {totalTimeSpent} minutes
            </p>
        </Card>
        <Card title="Cumulative Quiz Score">
            <p className="m-0">
                {cumulativeQuizScore} 
            </p>
        </Card>
        <Card title="Completion Rate">
            <p className="m-0">{((completedCourses / totalCourses) * 100).toFixed(2)}%</p>
        </Card>
        {/* <Card title="Total Categories">
            <p className="m-0">
                {category}
            </p>
        </Card> */}
        </div>
    <CourseList/>
    </main>
    </div>

);
};
