import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-xl font-bold tracking-tight">
        🎓 StudentMarket
      </Link>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-sm">Hi, {user.name}</span>
            <Link
              to="/add-product"
              className="bg-white text-blue-600 px-3 py-1 rounded font-medium text-sm hover:bg-blue-50"
            >
              + Sell Item
            </Link>
            <button onClick={handleLogout} className="text-sm underline hover:text-blue-200">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline text-sm">Login</Link>
            <Link
              to="/register"
              className="bg-white text-blue-600 px-3 py-1 rounded font-medium text-sm hover:bg-blue-50"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}