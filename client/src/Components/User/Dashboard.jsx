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
const [products,setProducts]=useState([])
const [profit,setProfit]=useState("")
const [orderCount,setCount]=useState(0)

const totalValue= products.reduce((value,product)=>value+product.totalprice,0);
const outOfStock= products.filter((product)=> product.quantity===0).length;
const category = new Set(products.map((product)=>product.category)).size;

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
        <Card title="Profit">
            <p style={{color:"green"}} className="m-0">
                {profit}
                </p>
        </Card>
        <Card title="No. Of Orders">
            <p style={{color:"green"}} className="m-0">
                {orderCount}
                </p>
        </Card>
        <Card title="Total Products">
            <p style={{color:"green"}} className="m-0">
                {products.length} 
            </p>
        </Card>
        <Card title="Store Value">
            <p style={{color:"green"}}   className="m-0">
                {totalValue} 
            </p>
        </Card>
        <Card title="Out Of Stock">
            <p className="m-0">
                {outOfStock} 
            </p>
        </Card>
        <Card title="Total Categories">
            <p className="m-0">
                {category}
            </p>
        </Card>
        </div>
    <CourseList/>
    </main>
    </div>

);
};
