import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link> |
      <Link to="/questions">Questions</Link> |
      <Link to="/add">Add Question</Link>
    </nav>
  );
}

export default Navbar;
