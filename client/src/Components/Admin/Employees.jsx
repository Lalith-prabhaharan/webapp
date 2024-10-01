import React from 'react'
import { Sidebar } from '../User/Sidebar'
import { EmployeeList } from './EmployeeList';
export const Employees = () => {
return (
    <div className='dashboard-container'>
    <Sidebar title="Products"/>
    <main className="main-content">
        <header className="dashboard-header">
        <h1>Employees</h1>
        <div className="user-info">
            <span> <b>Hii!!</b></span>
        </div>
        </header>
        <EmployeeList/>
        </main>
    </div>
)
}