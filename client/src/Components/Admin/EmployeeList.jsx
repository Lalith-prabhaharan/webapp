import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import "../../styles/employeelist.css"
import 'primeicons/primeicons.css';
import { Sidebar } from '../User/Sidebar';

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [selectedDetails, setSelectedDetails] = useState(null);
    const [editMode, setEditMode] = useState(false);

    const toast = useRef(null);

    const fetchEmployees = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/auth/all');
            setEmployees(res.data);
            setFilteredEmployees(res.data);
        } catch (err) {
            console.error("Error fetching products:", err);
        }
    };

    useEffect(() => {
        fetchEmployees();
        console.log()
    }, []);

    useEffect(() => {
        filterEmployees(searchText);
    }, [searchText, employees]);

    const handleInputChange = (event) => {
        const val = event.target.value.toLowerCase();
        setSearchText(val);
        console.log("ji")
    };

    const filterEmployees = (searchValue) => {
        const filtered = employees.filter((emp) => {
            return (
                emp.name.toLowerCase().includes(searchValue) 
            );
        });
        setFilteredEmployees(filtered);
    };

    const handleView = (emp) => {
        setSelectedDetails(emp);
        setEditMode(false);
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleCloseCard = () => {
        setSelectedDetails(null);
        setEditMode(false);
    };

    const handleDelete = async (id) => {
        try {
            console.log(id)
            await axios.delete(`http://localhost:8000/api/auth/user/${id}`)
            setEmployees(prevEmployees => prevEmployees.filter(emp => emp.userId !== id));
            setFilteredEmployees(prevFilteredEmployees => prevFilteredEmployees.filter(emp => emp.userId !== id));
            // toast.current.show({
            //     severity: "success",
            //     summary: "Deleted",
            //     detail: "Product deleted successfully",
            //     life: 3000,
            // });
        } catch (error) {
            console.error('Error deleting product:', error);
            
        }
    };

    const handleSave = async () => {
        if (!selectedDetails) return;
        console.log(selectedDetails.userId)
        console.log(selectedDetails)
        try {
            await axios.patch(`http://localhost:8000/api/auth/user/${selectedDetails.userId}`, selectedDetails);
            await fetchEmployees();
            setEditMode(false);
            // toast.current.show({
            //     severity: "success",
            //     summary: "Updated",
            //     detail: "Product updated successfully",
            //     life: 3000,
            // });
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const handleInputChangeInCard = (e) => {
        const { name, value } = e.target;
        setSelectedDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const buttons = (employee) => {
        return (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <i className="pi pi-eye" style={{ fontSize: '1.5rem', marginBottom: '2%' }} onClick={() => handleView(employee)}></i>
                <i className='pi pi-trash' style={{ fontSize: '1.5rem', marginBottom: '2%', marginLeft: '5%' }} onClick={() => handleDelete(employee.userId)} />
            </div>
        );
    };


    return (
        <div>
            <Toast ref={toast} />
            <InputText
                type="text"
                style={{ width: '20%', padding: '10px 20px', borderRadius: '10px', marginTop: '25px' ,marginBottom:'10px'}}
                value={searchText}
                onChange={handleInputChange}
                placeholder="Search Name or ID..."
            />
            <DataTable removableSort showGridlines stripedRows paginator rows={10} value={filteredEmployees} className='pending'>
                <Column field="name" sortable header="Employee Name"></Column>
                <Column field="email" style={{ width: "20%" }} sortable header="Email"></Column>
                <Column field="department" style={{ width: "20%" }} sortable header="Department"></Column>
                <Column field="designation" style={{ width: "20%" }} sortable header="Designation"></Column>
                <Column alignHeader={'center'} body={buttons} style={{ width: "20%" }} header="Actions"></Column>
            </DataTable>
            {selectedDetails && (
                <div className="custom-card-overlay">
                    <Card className="custom-card" title={
                        <div className="card-title" style={{ display: "flex", alignItems: "center" }}>
                            <span style={{ flex: "1" }}>Employee Details</span>
                            <i style={{ flex: "0" }} className="pi pi-times" onClick={handleCloseCard}></i>
                        </div>}>
                        <div>
                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
                                <div style={{ fontSize: "1.5rem", color: "#3459" }}>
                                    <span>{`${selectedDetails.name}`}</span>
                                </div>
                                <div style={{ display: "flex" }}>
                                    <p style={{ flex: "1" }}>
                                        <b>Email:</b><br />
                                        {editMode ?
                                            <InputText name="email" value={selectedDetails.email} onChange={handleInputChangeInCard} disabled />
                                            : <span style={{ color: "#3459" }}> {selectedDetails.email}</span>}
                                    </p>
                                    <p style={{ flex: "1" }}>
                                        <b>Name:</b><br />
                                        {editMode ?
                                            <InputText name="name" value={selectedDetails.name} onChange={handleInputChangeInCard} />
                                            : <span style={{ color: "#3459" }}> {selectedDetails.name}</span>}
                                    </p>
                                </div>
                                <div style={{ display: "flex" }}>
                                    <p style={{ flex: "1" }}>
                                        <b>Department:</b><br />
                                        {editMode ?
                                            <InputText name="department" value={selectedDetails.department} onChange={handleInputChangeInCard} />
                                            : <span style={{ color: "#3459" }}> {selectedDetails.department}</span>}
                                    </p>
                                    <p style={{ flex: "1" }}>
                                        <b>Designation:</b><br />
                                        {editMode ?
                                            <InputText name="designation" value={selectedDetails.designation} onChange={handleInputChangeInCard} />
                                            : <span style={{ color: "#3459" }}> {selectedDetails.designation}</span>}
                                    </p>
                                </div>
                                {editMode ? (
                                    <Button label="Save" icon="pi pi-check" onClick={handleSave} />
                                ) : (
                                    <Button label="Edit" icon="pi pi-pencil" onClick={handleEdit} />
                                )}
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
};
