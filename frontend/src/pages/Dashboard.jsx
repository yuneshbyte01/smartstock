import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Welcome, {user?.username} 👋</h1>
      <p className="text-gray-600">Role: {user?.role}</p>
      <p className="text-gray-600">Email: {user?.email}</p>
      <button onClick={logout} className="btn mt-4">Logout</button>
    </div>
  );
};

export default Dashboard;
