import React,{useRef,useState} from 'react'
import { Toast } from 'primereact/toast'
import { InputText } from 'primereact/inputtext'
import { Sidebar } from '../User/Sidebar'
import {Button} from 'primereact/button'
import { Card } from 'primereact/card'
import {Dropdown} from 'primereact/dropdown'
import "../../styles/addemployee.css"
import axios from "axios"

export const AddEmployee = () => {
const toast = useRef(null);
const [employee, setEmployee] = useState({
userId: '',
name: '',
email: '',
password: '',
role: '',
department: '',
designation: '',
createdAt:'',

});

const [categories] = useState(['Intern', 'Software Engineer', 'Senior Software Engineer', 'Solutions Enabler', 'Solutions Consultant', 'Solutions Architect', 'Principal Architect']);
const [departments] = useState(['Full-Stack', 'Data Engineering', 'Data Science', 'Testing', 'Devops', 'Consultancy'])

const handleChange = (e) => {
const { name, value } = e.target;
const numericValue = name === 'quantity' || name === 'buyprice' || name === 'sellprice'
    ? parseFloat(value) || 0
    : value;

setEmployee(prevEmployee => {
    const updatedEmployee = {
        ...prevEmployee,
        [name]: numericValue
    };

    // updatedEmployee.totalprice = updatedProduct.quantity * updatedProduct.sellprice;
    return updatedEmployee;
});
};

const handleCategoryChange = (e) => {
setEmployee(prevEmployee => ({
    ...prevEmployee,
    designation: e.value
}));
};

const handleDepartmentChange = (e) => {
setEmployee(prevEmployee => ({
    ...prevEmployee,
    department: e.value
}));
};

const handleSubmit = async (e) => {
e.preventDefault();
console.log(employee)
try {
    const response = await axios.post('http://localhost:8000/api/auth/register', employee);
    if (response.status === 201) {
        setEmployee({
            userId: '',
            name: '',
            email: '',
            password: '',
            role: '',
            department: '',
            designation: '',
            createdAt:'',
        });
    } 
    else {
        throw new Error("Failed to add Employee");
    }
} catch (error) {
    console.error('Error adding employee:', error);
}
} 

return (
<div className="dashboard-container">
        <Sidebar title="AddProduct"/>
        <main className="main-content">
            <header className="dashboard-header">
                <h1>Add Employee</h1>
                <div className="user-info">
                    <span><b>Hii !!</b></span>
                </div>
            </header>
            <div className="add-product-container">
                <Toast ref={toast} />
                <Card title="Add New Employee" className="add-product-card">
                    <form onSubmit={handleSubmit} className="form-two-columns">
                        <div className="form-column">
                            <div className="p-field">
                                <label htmlFor="product_id">Emp ID</label>
                                <InputText
                                    id="userId"
                                    name="userId"
                                    value={employee.emp_id}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="p-field">
                                <label htmlFor="product_name">Employee Name</label>
                                <InputText
                                    id="name"
                                    name="name"
                                    value={employee.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="p-field">
                                <label htmlFor="buyprice">Email</label>
                                <InputText
                                    id="email"
                                    name="email"
                                    value={employee.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="p-field">
                                <label htmlFor="sellprice">Password</label>
                                <InputText
                                    id="password"
                                    name="password"
                                    value={employee.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-column">
                            {/* <div className="p-field">
                                <label htmlFor="quantity">Designation</label>
                                <InputText
                                    id="quantity"
                                    name="quantity"
                                    value={product.quantity}
                                    onChange={handleChange}
                                    required
                                />
                            </div> */}
                            <div className="p-field">
                                <label htmlFor="category">Designation</label>
                                <Dropdown
                                    id="category"
                                    value={employee.designation}
                                    options={categories}
                                    onChange={handleCategoryChange}
                                    optionLabel="label"
                                    placeholder="Select Designation"
                                    required
                                />
                            </div>
                            <div className="p-field">
                                <label htmlFor="category">Department</label>
                                <Dropdown
                                    id="category"
                                    value={employee.department}
                                    options={departments}
                                    onChange={handleDepartmentChange}
                                    optionLabel="label"
                                    placeholder="Select Department"
                                    required
                                />
                            </div>
                            <div className="p-field">
                                <label htmlFor="date">Joined At</label>
                                <InputText
                                    id="createdAt"
                                    name="createdAt"
                                    type="date"
                                    value={employee.date}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            {/* <div className="p-field">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={product.description}
                                    onChange={handleChange}
                                    required
                                />
                            </div> */}
                            <Button
                                type="submit"
                                label="Add Employee"
                                className="p-button-success"
                            />
                        </div>
                    </form>
                </Card>
            </div>
        </main>
    </div>
)
}
