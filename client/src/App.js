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
          <Route path='/dashboard' element={<Quiz/>}> </Route>
          
        </Routes>
        </BrowserRouter>
    );
}

export default App;
