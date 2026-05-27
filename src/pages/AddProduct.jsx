import BASE_URL from '../api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const CATEGORIES = ['Books', 'Electronics', 'Vehicles', 'Furniture', 'Clothing', 'Other'];

export default function AddProduct() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', description: '', price: '', category: 'Other' });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));
      images.forEach((img) => formData.append('images', img));

      await axios.get(`${BASE_URL}/api/products`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user.token}`,
        },
      });
      toast.success('Product listed!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to list product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">List an Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text" placeholder="Title" required
          value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <textarea
          placeholder="Description" required rows={3}
          value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
        />
        <input
          type="number" placeholder="Price (₹)" required min="0"
          value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <div>
          <label className="text-sm text-gray-600 mb-1 block">Upload Images (max 5)</label>
          <input
            type="file" accept="image/*" multiple
            onChange={(e) => setImages([...e.target.files])}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>
        <button
          type="submit" disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Uploading...' : 'List Product'}
        </button>
      </form>
    </div>
  );
}