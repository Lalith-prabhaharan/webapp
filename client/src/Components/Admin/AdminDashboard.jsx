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
      const [users, setUsers] = useState([]);
      const [totalRecords, setTotalRecords] = useState(0);
      const [rowsPerPage] = useState(5);
      const [indexOfFirstRow, setIndexOfFirstRow] = useState(0);
      const [chartData, setChartData] = useState({
        categories: [],
        totalTimeSpent: [],
        totalScore: []
      });
      const [piechartData, setpieChartData] = useState({
        labels: [],
        series: []
      });
      // Fetch engagements for the user    
      useEffect(() => {
        fetchEngagementData();
        fetchCompletedCoursesData();
        fetchUserEngagements();
      }, []);
    
      const fetchEngagementData = async () => {
        try {
          const response = await axios.get("http://localhost:8000/api/engagement/course");
          const data = response.data;
    
          const categories = data.map(item => item.courseName); // X-axis (Course Names)
          const totalTimeSpent = data.map(item => item.totalTimeSpent); // Y-axis (Total Time Spent)
          const totalScore = data.map(item => item.totalScore); // Y-axis (Total Score)
    
          setChartData({
            categories,
            totalTimeSpent,
            totalScore
          });
        } catch (error) {
          console.error("Error fetching engagement data:", error);
        }
      };
    
      const options = {
        chart: {
          id: 'course-engagement',
        },
        xaxis: {
          categories: chartData.categories
        },
        yaxis: {
          title: {
            text: 'Total Time Spent (mins) & Score'
          }
        },
        legend: {
          position: 'top',
        },
      };
    
      const series = [
        {
          name: 'Total Time Spent (mins)',
          data: chartData.totalTimeSpent,
        },
        {
          name: 'Total Score',
          data: chartData.totalScore,
        }
      ];

      const fetchCompletedCoursesData = async () => {
        try {
          const response = await axios.get("http://localhost:8000/api/engagement/department");
          const data = response.data;
    
          const labels = data.map(item => item.department); // Labels for the pie chart (departments)
          const series = data.map(item => item.completedCoursesCount); // Series (Number of completed courses)
          
          setpieChartData({
            labels,
            series
          });
        } catch (error) {
          console.error("Error fetching completed courses by department:", error);
        }
      };

      const pieoptions = {
        labels: piechartData.labels,
        legend: {
          position: 'bottom'
        },
        title: {
          text:"Course Completion Count by Department",  // Title of the pie chart
          align: 'center'
        },
      };

      const fetchUserEngagements = async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/engagement/users'); // API route to fetch user data
          setUsers(response.data);
          setTotalRecords(response.data.length);
        } catch (error) {
          console.error('Error fetching user engagement data:', error);
        }
      };

      const onPageChange = (event) => {
        setIndexOfFirstRow(event.first);
      };
    
      // Paginated data to display
      const currentRows = users.slice(indexOfFirstRow, indexOfFirstRow + rowsPerPage);
    

      return (
        <div className="dashboard-container">
            <AdminSidebar title="Dashboard"/>
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
                  {/* <Chart options={chartData.options} series={chartData.series} type="bar" height={350} /> */}
                    <Chart
                      options={options}
                      series={series}
                      type="bar"
                      height="350"
                    />
                </div>
                <div className="chart-wrapper">
                  {/* <Chart options={dummyPieData.options} series={dummyPieData.series} type="pie" width={350} /> */}
                  <Chart
                    options={pieoptions}
                    series={piechartData.series}
                    type="pie"
                    height="350"

                  />
                </div>
              </div>
          
              <div className="datatable-container">
                <h6 style={{ textAlign: "center" }}>
                  <b>Employee Cummulative Scores</b>
                </h6>
                <DataTable value={currentRows} paginator={false}>
                  <Column field="Name" header="Name"></Column>
                  <Column field="Department" header="Department"></Column>
                  <Column field="Designation" header="Designation"></Column>
                  {/* <Column field="Percentage" header="Percentage"></Column> */}
                  <Column field="TotalTrainings" header={`No. of Trainings Completed`}> </Column>
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
