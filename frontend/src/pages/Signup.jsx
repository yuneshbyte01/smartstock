import { useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    role: 'STAFF',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/auth/signup', form);
      alert("Signup successful!");
      navigate('/login');
    } catch (err) {
      setError(err.response?.data || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <input name="username" value={form.username} onChange={handleChange}
          placeholder="Username" className="input" required />

        <input type="email" name="email" value={form.email} onChange={handleChange}
          placeholder="Email" className="input" required />

        <input type="password" name="password" value={form.password} onChange={handleChange}
          placeholder="Password" className="input" required />

        <select name="role" value={form.role} onChange={handleChange} className="input">
          <option value="STAFF">STAFF</option>
          <option value="MANAGER">MANAGER</option>
          <option value="ADMIN">ADMIN</option>
        </select>

        <button type="submit" className="btn">Register</button>
      </form>
    </div>
  );
}

export default Signup;
