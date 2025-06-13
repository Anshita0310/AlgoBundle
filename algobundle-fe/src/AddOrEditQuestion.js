import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function AddOrEditQuestion() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    topic: '',
    difficulty: '',
    link: '',
    solved: false,
  });

  useEffect(() => {
    if (isEdit) {
      axios.get(`http://localhost:8080/api/dsa/${id}`)
        .then((res) => {
          if (res.data.success) {
            setFormData(res.data.data);
          } else {
            alert('Failed to fetch question');
          }
        })
        .catch((err) => {
          console.error('Error fetching question:', err);
          alert('Error fetching question');
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.put(`http://localhost:8080/api/dsa/${id}`, formData);
        alert('Question updated successfully!');
      } else {
        await axios.post('http://localhost:8080/api/dsa', formData);
        alert('Question added successfully!');
      }

      navigate('/questions');
    } catch (error) {
      console.error('Error saving question:', error);
      alert('Failed to save question');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">{isEdit ? 'Edit' : 'Add'} DSA Question</h2>
      <form onSubmit={handleSubmit} className="border p-4 shadow rounded">

        <div className="mb-3">
          <label className="form-label">Title</label>
          <input type="text" name="title" className="form-control" value={formData.title} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea name="description" className="form-control" rows="3" value={formData.description} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Topic</label>
          <input type="text" name="topic" className="form-control" value={formData.topic} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Difficulty</label>
          <select name="difficulty" className="form-select" value={formData.difficulty} onChange={handleChange} required>
            <option value="">-- Select --</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Link</label>
          <input type="url" name="link" className="form-control" value={formData.link} onChange={handleChange} required />
        </div>

        <div className="form-check mb-3">
          <input className="form-check-input" type="checkbox" name="solved" checked={formData.solved} onChange={handleChange} />
          <label className="form-check-label">Solved</label>
        </div>

        <button type="submit" className="btn btn-primary">
          {isEdit ? 'Update' : 'Add'} Question
        </button>
      </form>
    </div>
  );
}

export default AddOrEditQuestion;
