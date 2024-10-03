import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import Chart from "react-apexcharts"; 
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../../styles/admindashboard.css'; 
import { AdminSidebar } from './AdminSidebar';

export const AdminDashboard = () => {
    // const [tableData, setTableData] = useState([]);
    // const [barChartData, setBarChartData] = useState({});
    // const [pieChartData, setPieChartData] = useState({});
    // const [currentPage, setCurrentPage] = useState(0);
    // const [rowsPerPage, setRowsPerPage] = useState(10);

    // useEffect(() => {
    //     fetchTableData();
    //     fetchBarChartData();
    //     fetchPieChartData();
    // }, []);

    // // Fetch the table data
    // const fetchTableData = async () => {
    //     try {
    //         const response = await axios.get("http://localhost:5000/api/v1/admin/cummulative");
    //         setTableData(response.data);
    //     } catch (error) {
    //         console.error("Error fetching table data:", error);
    //     }
    // };

    // // Fetch bar chart data
    // const fetchBarChartData = async () => {
    //     try {
    //         const response = await axios.get("http://localhost:5000/api/v1/admin/training-scores");
    //         const data = response.data;

    //         // Setup bar chart options
    //         setBarChartData({
    //             series: [{
    //                 name: 'Training Scores',
    //                 data: data.map(item => item.score)
    //             }],
    //             options: {
    //                 chart: {
    //                     type: 'bar',
    //                     height: 350
    //                 },
    //                 plotOptions: {
    //                     bar: {
    //                         borderRadius: 4,
    //                         horizontal: true,
    //                     }
    //                 },
    //                 xaxis: {
    //                     categories: data.map(item => item.name)
    //                 },
    //                 title: {
    //                     text: "Employee Training Scores",
    //                     align: 'center',
    //                     style: { fontSize: '16px', color: '#333' }
    //                 }
    //             }
    //         });
    //     } catch (error) {
    //         console.error("Error fetching bar chart data:", error);
    //     }
    // };

    // // Fetch pie chart data
    // const fetchPieChartData = async () => {
    //     try {
    //         const response = await axios.get("http://localhost:5000/api/v1/admin/engagement");
    //         const data = response.data;

    //         // Setup pie chart options
    //         setPieChartData({
    //             series: data.map(item => item.engagementPercentage),
    //             options: {
    //                 labels: data.map(item => item.activity),
    //                 responsive: [{
    //                     breakpoint: 480,
    //                     options: {
    //                         chart: {
    //                             width: 300
    //                         },
    //                         legend: {
    //                             position: 'bottom'
    //                         }
    //                     }
    //                 }],
    //                 title: {
    //                     text: "Employee Engagement Distribution",
    //                     align: 'center',
    //                     style: { fontSize: '16px', color: '#333' }
    //                 }
    //             }
    //         });
    //     } catch (error) {
    //         console.error("Error fetching pie chart data:", error);
    //     }
    // };

    // // Handle page change for PrimeReact Paginator
    // const onPageChange = (event) => {
    //     setCurrentPage(event.first);
    //     setRowsPerPage(event.rows);
    // };

    // return (
    //     <div className='admin'>
    //     <div className="dashboard-container">
    //         <div className="charts-container">
    //             {/* Bar Chart for Training Scores */}
    //             <div className="chart-wrapper">
    //                 <ReactApexChart options={barChartData.options} series={barChartData.series} type="bar" height={350} />
    //             </div>

    //             {/* Pie Chart for Engagement Distribution */}
    //             <div className="chart-wrapper">
    //                 <ReactApexChart options={pieChartData.options} series={pieChartData.series} type="pie" height={350} />
    //             </div>
    //         </div>

    //         {/* Data Table for Employee Cumulative Scores */}
    //         <div className="datatable-container">
    //             <DataTable value={tableData.slice(currentPage, currentPage + rowsPerPage)} paginator={false}>
    //                 <Column field="Name" header="Name" sortable />
    //                 <Column field="Designation" header="Designation" sortable />
    //                 <Column field="Percentage" header="Percentage" sortable />
    //                 <Column field="Total Trainings" header="No. of Trainings" sortable />
    //                 <Column field="Time Spent" header="Time Spent (hrs)" sortable />
    //                 <Column field="Discussions Participated" header="Discussions Participated" sortable />
    //                 <Column field="Quiz Score" header="Quiz Score" sortable />
    //             </DataTable>

    //             {/* Paginator */}
    //             <Paginator first={currentPage} rows={rowsPerPage} totalRecords={tableData.length} rowsPerPageOptions={[5, 10, 20]} onPageChange={onPageChange} />
    //         </div>
    //     </div>
    //     </div>
    // );

    const dummyTableData = [
        { id: 1, Name: "John Doe", Designation: "Developer", Percentage: 85, "Total Trainings": 10 },
        { id: 2, Name: "Jane Smith", Designation: "Designer", Percentage: 90, "Total Trainings": 12 },
        { id: 3, Name: "Chris Brown", Designation: "Manager", Percentage: 78, "Total Trainings": 8 },
        // Add more dummy employees if needed
      ];
    
      const dummyBarData = {
        series: [
          {
            name: "Scores",
            data: [85, 72, 90, 95, 88],
          },
        ],
        options: {
          chart: {
            type: "bar",
            height: 350,
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: "55%",
              endingShape: "rounded",
            },
          },
          xaxis: {
            categories: ["Course 1", "Course 2", "Course 3", "Course 4", "Course 5"],
          },
          fill: {
            opacity: 1,
          },
        },
      };
    
      const dummyPieData = {
        series: [40, 30, 30],
        options: {
          chart: {
            type: "pie",
          },
          labels: ["Developer", "Designer", "Manager"],
          colors: ["#42A5F5", "#66BB6A", "#FFA726"],
        },
      };
    
      const [tableData, setTableData] = useState(dummyTableData);
      const [topPerformer, setTopPerformer] = useState(dummyTableData[0].Name);
      const [topCourse, setTopCourse] = useState("Course 4");
      const [currentPage, setCurrentPage] = useState(1);
      const [rowsPerPage] = useState(2); // Rows per page
    
      // Calculate pagination data
      const indexOfLastRow = currentPage * rowsPerPage;
      const indexOfFirstRow = indexOfLastRow - rowsPerPage;
      const currentRows = tableData.slice(indexOfFirstRow, indexOfLastRow);
      const totalRecords = tableData.length;
    
      const onPageChange = (event) => {
        setCurrentPage(event.page + 1);
      };
    
      return (
        <div className="dashboard-container">
            <AdminSidebar/>
            <main className="main-content">
            <header className="dashboard-header">
                <h1>Dashboard</h1>
                <div className="user-info">
                    <span><b>Hii !!</b></span>
                </div>
            </header>
            <div className="admin-dashboard-container">
              <div className="charts-container">
                <div className="chart-wrapper">
                  <Chart options={dummyBarData.options} series={dummyBarData.series} type="bar" height={350} />
                </div>
                <div className="chart-wrapper">
                  <Chart options={dummyPieData.options} series={dummyPieData.series} type="pie" width={350} />
                </div>
              </div>
          
              <div className="datatable-container">
                <h6 style={{ textAlign: "center" }}>
                  <b>Employee Cummulative Scores</b>
                </h6>
                <DataTable value={currentRows} paginator={false}>
                  <Column field="Name" header="Name"></Column>
                  <Column field="Designation" header="Designation"></Column>
                  <Column field="Percentage" header="Percentage"></Column>
                  <Column field="Total Trainings" header="No of Trainings"></Column>
                </DataTable>
          
                <Paginator
                  first={indexOfFirstRow}
                  rows={rowsPerPage}
                  totalRecords={totalRecords}
                  onPageChange={onPageChange}
                  className="ms-5"
                />
              </div>
            </div>
            </main>
        </div>
    );
          
};  
