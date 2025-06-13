import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProgressTracker from './ProgressTracker';

function Dashboard() {
  return (
    <div className="container text-center mt-5">
      <h1>Welcome to AlgoBundle</h1>
      <p className="lead">Your personal DSA practice tracker</p>

      {/* Progress Tracker */}
      <div className="my-4">
        <ProgressTracker />
      </div>

      <div className="d-flex justify-content-center gap-4 mt-4">
        <Link to="/questions" className="btn btn-outline-primary btn-lg">
          View All Questions
        </Link>
        <Link to="/add-question" className="btn btn-outline-success btn-lg">
          Add New Question
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
