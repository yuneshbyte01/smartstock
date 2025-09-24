import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'; // dummy protected page
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

