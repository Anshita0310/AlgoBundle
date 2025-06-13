import React, { useEffect, useState } from 'react';
import { fetchProgress } from '../api/api'; // Adjust the path based on your setup

const ProgressTracker = () => {
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchProgress();
        setProgress(response.data); // Adjust the response format if needed
      } catch (err) {
        console.error('Error fetching progress:', err);
        setError('Failed to fetch progress data.');
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  if (!progress) {
    return <div>Loading progress...</div>;
  }

  const { totalQuestions, solvedQuestions } = progress;
  const progressPercentage = ((solvedQuestions / totalQuestions) * 100).toFixed(2);

  return (
    <div className="card shadow-sm p-3 mb-4">
      <h2 className="card-title text-center mb-3">Progress Tracker</h2>
      <div className="progress" style={{ height: '20px' }}>
        <div
          className="progress-bar progress-bar-striped bg-success"
          role="progressbar"
          style={{ width: `${progressPercentage}%` }}
          aria-valuenow={progressPercentage}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {progressPercentage}%
        </div>
      </div>
      <p className="text-muted text-center mt-2">
        {solvedQuestions} out of {totalQuestions} questions solved.
      </p>
    </div>
  );
};

export default ProgressTracker;
