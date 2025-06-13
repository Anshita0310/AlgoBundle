import React, { useEffect, useState } from 'react';
import { fetchAllQuestions } from './api/api';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Questions() {
  const [questions, setQuestions] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllQuestions()
      .then((res) => {
        if (res.success) {
          setQuestions(res.data);
        } else {
          console.error("Backend error:", res.message);
        }
      })
      .catch((err) => console.error("API call failed:", err));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      try {
        await axios.delete(`http://localhost:8080/api/dsa/${id}`);
        setQuestions(questions.filter((q) => q.id !== id));
      } catch (err) {
        console.error("Failed to delete question:", err);
        alert("Failed to delete question");
      }
    }
  };

  const toggleSolved = async (id, currentStatus) => {
    try {
      // Fetch the full question details
      const res = await axios.get(`http://localhost:8080/api/dsa/${id}`);
      const fullQuestion = res.data.data;

      if (!fullQuestion) {
        console.error("Question not found");
        alert("Question not found");
        return;
      }

      // Prepare updated question
      const updatedQuestion = { ...fullQuestion, solved: !currentStatus };

      // Send PUT request
      const updateResponse = await axios.put(`http://localhost:8080/api/dsa/${id}`, updatedQuestion);
      console.log("Update Response:", updateResponse.data);

      // Update state
      setQuestions((prev) =>
        prev.map((q) => (q.id === id ? updatedQuestion : q))
      );

      alert("Solved status updated successfully!");
    } catch (err) {
      console.error("Failed to toggle solved status:", err);
      alert("Failed to toggle solved status");
    }
  };


  const filteredQuestions = questions.filter((q) =>
    q.title.toLowerCase().includes(searchText.toLowerCase()) &&
    (filterDifficulty === '' || q.difficulty === filterDifficulty)
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-3">All DSA Questions</h2>

      {/* Search & Filter */}
      <div className="mb-3 d-flex gap-3">
        <input
          className="form-control"
          type="text"
          placeholder="Search by title..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ maxWidth: "300px" }}
        />
        <select
          className="form-select"
          value={filterDifficulty}
          onChange={(e) => setFilterDifficulty(e.target.value)}
          style={{ maxWidth: "200px" }}
        >
          <option value="">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      {filteredQuestions.length === 0 ? (
        <p>No questions found.</p>
      ) : (
        <ul className="list-group">
          {filteredQuestions.map((q) => (
            <li
              key={q.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{q.title}</strong> ({q.topic} - {q.difficulty}){" "}
                <span className={`badge ${q.solved ? 'bg-success' : 'bg-secondary'}`}>
                  {q.solved ? "Solved" : "Unsolved"}
                </span>
              </div>
              <div className="btn-group">
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => toggleSolved(q.id, q.solved)}
                >
                  Toggle Solved
                </button>
                <button
                  className="btn btn-sm btn-outline-warning"
                  onClick={() => navigate(`/edit-question/${q.id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(q.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Questions;
