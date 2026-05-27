import BASE_URL from '../api';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export default function ProductDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(({ data }) => setProduct(data))
      .catch(() => toast.error('Product not found'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await axios.get(`${BASE_URL}/api/products`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      toast.success('Product deleted');
      navigate('/');
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  if (loading) return <p className="text-center text-gray-400">Loading...</p>;
  if (!product) return <p className="text-center text-gray-400">Product not found.</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          {product.images.length > 0 ? (
            <>
              <img src={product.images[imgIndex].url} alt={product.title}
                className="w-full h-64 object-cover rounded-lg" />
              <div className="flex gap-2 mt-2">
                {product.images.map((img, i) => (
                  <img key={i} src={img.url} onClick={() => setImgIndex(i)}
                    className={`w-14 h-14 object-cover rounded cursor-pointer border-2 ${i === imgIndex ? 'border-blue-500' : 'border-transparent'}`} />
                ))}
              </div>
            </>
          ) : (
            <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center text-5xl">📦</div>
          )}
        </div>
        <div>
          <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">{product.category}</span>
          <h1 className="text-2xl font-bold mt-2 text-gray-800">{product.title}</h1>
          <p className="text-3xl font-bold text-blue-600 mt-2">₹{product.price}</p>
          <p className="text-gray-600 mt-3">{product.description}</p>

          <div className="mt-4 border-t pt-4">
            <p className="font-semibold text-gray-700">Seller Info</p>
            <p className="text-sm text-gray-500">{product.seller?.name}</p>
            <p className="text-sm text-gray-500">{product.seller?.email}</p>
            {product.seller?.phone && (
              <p className="text-sm text-gray-500">📞 {product.seller.phone}</p>
            )}
          </div>

          {user && user._id === product.seller?._id && (
            <button onClick={handleDelete}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 text-sm">
              Delete Listing
            </button>
          )}
        </div>
      </div>
    </div>
  );
}