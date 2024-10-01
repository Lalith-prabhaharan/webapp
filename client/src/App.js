import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Link, BrowserRouter, Routes } from 'react-router-dom';
// import EmployeeDashboard from './Components/User/EmployeeDashboard';
// import LearningMaterial from './Components/User/LearningMaterial';
// import AdminDashboard from './Components/Admin';
import { Login } from './Components/User/Login';

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
          
        </Routes>
        </BrowserRouter>
    );
}

export default App;
