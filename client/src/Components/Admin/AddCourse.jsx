import React,{useRef,useState} from 'react'
import { Editor } from '@tinymce/tinymce-react';
import ReactMarkdown from 'react-markdown';
import { InputText } from 'primereact/inputtext'
import { Sidebar } from '../User/Sidebar'
import {Button} from 'primereact/button'
import { Card } from 'primereact/card'
import {Dropdown} from 'primereact/dropdown'
import "../../styles/addemployee.css"
import axios from "axios"
import { AdminSidebar } from './AdminSidebar';
export const AddCourse = () =>{
    const [course, setCourse] = useState({
        courseId: '',
        name: '',
        est_duration: '',
        videoUrls: '',
        prerequisites: '',
        stack: '',
        postedby:'',
        blogContent:''
        
        });
    const [categories] = useState(['fullstack','data engineering', 'data science', 'gen AI']);
    
    // const [blogContent, setBlogContent] = useState('');

    // const handleEditorChange = (content,editor) => {
    //     // setBlogContent(content); // Stores the HTML content
    //     setCourse({ ...course, blogContent: content });
    // };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const numericValue = name === 'quantity' || name === 'buyprice' || name === 'sellprice'
            ? parseFloat(value) || 0
            : value;
        
        setCourse(prevCourse => {
            const updatedCourse = {
                ...prevCourse,
                [name]: numericValue
            };
        
            // updatedEmployee.totalprice = updatedProduct.quantity * updatedProduct.sellprice;
            return updatedCourse;
        });
    };

    const handleBlogContentChange = (content) => {
        // Update blogContent specifically for TinyMCE
        setCourse(prevCourse => ({
          ...prevCourse,
          blogContent: content, // Update blogContent
        }));
      };

    const handleCategoryChange = (e) => {
        setCourse(prevCourse => ({
            ...prevCourse,
            stack: e.value
        }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(course)
        try {
            const response = await axios.post('http://localhost:8000/api/courses/addcourse', course, {headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }});
            if (response.status === 201) {
                setCourse({
                    courseId: '',
                    name: '',
                    est_duration: '',
                    videoUrls: '',
                    prerequisites: '',
                    stack: '',
                    postedby:'',
                    blogContent:''
                });
            } 
            else {
                throw new Error("Failed to add Course");
            }
        } catch (error) {
            console.error('Error adding course:', error);
        }
    } 
    
    return(
    <div className="dashboard-container">
        <AdminSidebar title="AddCourse"/>
        <main className="main-content">
            <header className="dashboard-header">
                <h1>Add Course</h1>
                <div className="user-info">
                    <span><b>Hii !!</b></span>
                </div>
            </header>
            <div className="add-product-container">
                <Card title="Add New Course" className="add-product-card">
                    <form onSubmit={handleSubmit} className="form-two-columns">
                        <div className="form-column">
                            <div className="p-field">
                                <label htmlFor="product_id">Course ID</label>
                                <InputText
                                    id="courseId"
                                    name="courseId"
                                    value={course.courseId}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="p-field">
                                <label htmlFor="product_name">Course Name</label>
                                <InputText
                                    id="name"
                                    name="name"
                                    value={course.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="p-field">
                                <label htmlFor="buyprice">Estimated Duration</label>
                                <InputText
                                    id="est_duration"
                                    name="est_duration"
                                    value={course.est_duration}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="p-field">
                                <label htmlFor="sellprice">Video URL</label>
                                <InputText
                                    id="videoUrls"
                                    name="videoUrls"
                                    value={course.videoUrls}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="p-field">
                                <label htmlFor="quantity">Pre-Requisites</label>
                                <InputText
                                    id="prerequisites"
                                    name="prerequisites"
                                    value={course.prerequisites}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="p-field">
                                <label htmlFor="category">Stack</label>
                                <Dropdown
                                    id="category"
                                    value={course.stack}
                                    options={categories}
                                    onChange={handleCategoryChange}
                                    optionLabel="label"
                                    placeholder="Select Stack"
                                    required
                                />
                            </div>
                            <div className="p-field">
                                <label htmlFor="date">Posted By</label>
                                <InputText
                                    id="postedby"
                                    name="postedby"
                                    type="date"
                                    value={course.postedby}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-column">
                            <div className="p-field">
                                <label htmlFor="description">Blog</label>
                                {/* <textarea
                                    id="blogContent"
                                    name="blogContent"
                                    value={course.blogContent}
                                    onChange={handleChange}
                                    required
                                /> */}
                                <Editor
                                apiKey="swu438y0hj8uf2ih3nn4uy70i7t11dy0phqu3pfou6151wyw"
                                initialValue="<p>Enter blog content here...</p>"
                                name="blogContent"
                                id="blogContent"
                                value={course.blogContent}
                                init={{
                                height: 500,
                                menubar: false,
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount'
                                ],
                                toolbar:
                                    'undo redo | formatselect | bold italic backcolor | \
                                    alignleft aligncenter alignright alignjustify | \
                                    bullist numlist outdent indent | removeformat | help'
                                }}
                                onEditorChange={handleBlogContentChange}
                            />
                            </div>
                            <Button
                                type="submit"
                                label="Add Employee"
                                className="p-button-success"
                            />
                        </div>
                        {/* <div>
                            <h3>Preview:</h3>
                            <ReactMarkdown>{course.blogContent}</ReactMarkdown>
                        </div> */}
                    </form>
                </Card>
            </div>
        </main>
    </div>
    )
}