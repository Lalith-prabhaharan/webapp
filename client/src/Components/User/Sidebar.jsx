import React,{useRef} from 'react'
import { Link } from 'react-router-dom'
import "../../styles/dashboard.css"
// import logo from "../images/appleLogo.jpg"

export const Sidebar = ({title}) => {
const activeTab = title;

const logout=()=>{
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
        <li className={activeTab === "Products" ? "active-tab" : ""}>
            <Link to="/products"> Products </Link>
        </li>
        <li className={activeTab === "Despatch" ? "active-tab" : ""}>
            <Link to="/despatch"> Despatch </Link>
        </li>
        <li className={activeTab === "AddProduct" ? "active-tab" : ""}>
            <Link to="/addproduct"> Add Product </Link>
        </li>
        <li className={activeTab === "Insights" ? "active-tab" : ""}>
            <Link to="/insights"> Insights </Link>
        </li>
        </ul>
        <hr></hr>
        <button className="logout-button" onClick={()=>logout()} >Logout</button>
    </aside>
    </div>
)
}
