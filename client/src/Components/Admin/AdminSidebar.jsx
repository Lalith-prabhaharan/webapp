import React,{useRef} from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import "../../styles/dashboard.css"
// import logo from "../images/appleLogo.jpg"

export const AdminSidebar = ({title}) => {
const activeTab = title;
const navigate = useNavigate()
const logout=()=>{
    localStorage.removeItem("token")
    navigate("/")
    console.log('Logging out');
}
return (
    <div className="dashboard-container">
    <aside className="sidebar">
        <div className="sidebar-logo">
            {/* <img src={logo} width="150px"/> */}
        </div>
        <h2 style={{textAlign:'center'}}>JMAN LEARNING</h2>
        <ul className="sidebar-menu">
        <li  className={activeTab === "Dashboard" ? "active-tab" : ""}>
            <Link to="/dashboard"> Dashboard </Link>
        </li>
        <li className={activeTab === "Employee" ? "active-tab" : ""}>
            <Link to="/employee"> Employees </Link>
        </li>
        <li className={activeTab === "Courses" ? "active-tab" : ""}>
            <Link to="/courses"> Courses </Link>
        </li>
        <li className={activeTab === "AddEmployee" ? "active-tab" : ""}>
            <Link to="/addemployee"> Add Employee </Link>
        </li>
        <li className={activeTab === "AddCourse" ? "active-tab" : ""}>
            <Link to="/addcourse"> Add Course </Link>
        </li>
        </ul>
        <hr></hr>
        <button className="logout-button" onClick={()=>logout()} >Logout</button>
    </aside>
    </div>
)
}
