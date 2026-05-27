import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddProduct from './pages/AddProduct';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;