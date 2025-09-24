import { useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username);
      localStorage.setItem('email', res.data.email);
      localStorage.setItem('role', res.data.role);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Log In</h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <input type="email" name="email" value={form.email} onChange={handleChange}
          placeholder="Email" className="input" required />

        <input type="password" name="password" value={form.password} onChange={handleChange}
          placeholder="Password" className="input" required />

        <button type="submit" className="btn">Login</button>
      </form>
    </div>
  );
}

export default Login;
