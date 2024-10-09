import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../styles/discussions.css"
import { Sidebar } from './Sidebar';
import { useParams } from 'react-router-dom';

const Discussions = () => {

  const { courseId } = useParams();
  const [discussions, setDiscussions] = useState([]);
  const [newTopic, setNewTopic] = useState('');
  const [newDescription, setNewDescription] = useState('');

  useEffect(() => {
    // Fetch discussions for the course
    axios.get(`http://localhost:8000/api/discussion/${courseId}`).then(response => {
      setDiscussions(response.data);
    });
  }, [courseId]);

  const handleCreateDiscussion = () => {
    // Post a new discussion
    axios.post('http://localhost:8000/api/discussion', { courseId, userId: localStorage.getItem("id"), topic: newTopic, name:localStorage.getItem("name"), description: newDescription })
      .then(response => {
        setDiscussions([response.data, ...discussions]);
        setNewTopic('');
        setNewDescription('');
      });
  };

  return (
    <div className="dashboard-container">
        <Sidebar/>
        <main className="main-content">
            <div className="discussions-page">
            <h1>Course Discussions</h1>

            <div className="new-discussion">
                <input
                type="text"
                placeholder="Discussion Topic"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                />
                <textarea
                placeholder="Description"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                />
                <button onClick={handleCreateDiscussion}>Post Discussion</button>
            </div>

            <div className="discussion-list">
            {discussions && discussions.length > 0 ? (
                discussions.map(discussion => (
                <div key={discussion._id} className="discussion-item">
                    <h3>{discussion.topic}</h3>
                    <p>{discussion.description}</p>
                    <p><strong>Posted by:</strong> {discussion.name} <strong> At:</strong>{discussion.createdAt}</p>
                </div>
                ))
              ):(
                <p>No discussions started yet!!</p>
              )
              }
            </div>
            </div>
        </main>
    </div>
  );
};

export default Discussions;
