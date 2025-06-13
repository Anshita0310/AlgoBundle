import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Questions from './Questions';
import AddOrEditQuestion from './AddOrEditQuestion';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <div>
        <nav style={{ marginBottom: "20px" }}>
          <Link to="/" style={{ marginRight: "15px" }}>Home</Link>
          <Link to="/questions" style={{ marginRight: "15px" }}>Questions</Link>
          <Link to="/add-question">Add Question</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/add-question" element={<AddOrEditQuestion />} />
          <Route path="/edit-question/:id" element={<AddOrEditQuestion />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
