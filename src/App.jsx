import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/pages/home';
import Login from './components/pages/login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;