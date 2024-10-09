import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Link, BrowserRouter, Routes } from 'react-router-dom';
// import EmployeeDashboard from './Components/User/EmployeeDashboard';
// import LearningMaterial from './Components/User/LearningMaterial';
// import AdminDashboard from './Components/Admin';
import { Login } from './Components/User/Login';
import { Sidebar } from './Components/User/Sidebar';
import { Dashboard } from './Components/User/Dashboard';
import { NavBar } from './Components/User/NavBar';
import { Course } from './Components/User/Course';
import { AddEmployee } from './Components/Admin/AddEmployee';
import { EmployeeList } from './Components/Admin/EmployeeList';
import { Employees } from './Components/Admin/Employees';
import { AddCourse } from './Components/Admin/AddCourse';
import QuizForm from './Components/Admin/QuizForm';
import Quiz from './Components/User/Quiz';
import { CourseDetail } from './Components/User/CourseDetail';
import { Feedback } from './Components/User/Feedback';
import {  Charts } from './Components/User/Chart';
import { CourseList } from './Components/User/CourseList';
import { AdminCourseList } from './Components/Admin/CourseList';
import { Requiredauth } from './Components/utils/requiredAuth';
import { AdminSidebar } from './Components/Admin/AdminSidebar';
import { AdminDashboard } from './Components/Admin/AdminDashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Discussions from './Components/User/Discussions';

function App() {
    return (
        // <Router>
        //     <nav>
        //         <Link to="/">Employee Dashboard</Link> | 
        //         <Link to="/admin">Admin Dashboard</Link>
        //     </nav>
        //     <Switch>
        //         <Route path="/" exact component={EmployeeDashboard} />
        //         <Route path="/admin" component={AdminDashboard} />
        //         <Route path="/material/:id" component={LearningMaterial} />
        //     </Switch>
        // </Router>
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}> </Route>
          <Route path='/dashboard' element={<Requiredauth><Dashboard/></Requiredauth>}> </Route>
          <Route path='/insightdashboard' element={<Requiredauth><AdminDashboard/></Requiredauth>}> </Route>
          <Route path="/courses/:courseId" element={<Requiredauth><CourseDetail/></Requiredauth>}> </Route>
          <Route path="/quiz/:courseId" element={<Requiredauth><Quiz/></Requiredauth>}> </Route>
          <Route path="/course" element={<CourseList/>}> </Route>
          <Route path="/feedback/:courseId" element={<Feedback/>}> </Route>
          <Route path="/employee" element={<EmployeeList/>}> </Route>
          <Route path="/discussions/:courseId" element={<Discussions/>}> </Route>
          <Route path="/create-quiz/:courseId" element={<QuizForm/>}> </Route>
          <Route path="/courses" element={<AdminCourseList/>}> </Route>
          <Route path="/addemployee" element={<AddEmployee/>}> </Route>
          <Route path="/addcourse" element={<AddCourse/>}> </Route>
        </Routes>
        <ToastContainer />
        </BrowserRouter>
    );
}

export default App;
