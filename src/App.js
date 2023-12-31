import React, { lazy, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

const BCZ = lazy(() => import('./page/Bcz/Bcz.jsx'));
function App() {
  useEffect(() => { document.title = "实习作品集" }, [])
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/bcz/*" element={<BCZ></BCZ>} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;