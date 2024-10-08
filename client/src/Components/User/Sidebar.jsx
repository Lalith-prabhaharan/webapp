import React,{useRef} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../../styles/dashboard.css"
// import logo from "../images/appleLogo.jpg"

export const Sidebar = ({title}) => {
const activeTab = title;
const navigate = useNavigate();
const logout=()=>{
    console.log('Logging out');
    localStorage.removeItem("token")
    navigate('/')
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
        <li className={activeTab === "Course" ? "active-tab" : ""}>
            <Link to="/course"> Course </Link>
        </li>
        </ul>
        <hr></hr>
        <button className="logout-button" onClick={()=>logout()} >Logout</button>
    </aside>
    </div>
)
}
