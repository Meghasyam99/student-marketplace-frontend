import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product._id}`}>
      <div className="bg-white rounded-xl shadow hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
        {product.images.length > 0 ? (
          <img
            src={product.images[0].url}
            alt={product.title}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400 text-3xl">
            📦
          </div>
        )}
        <div className="p-4">
          <h3 className="font-semibold text-gray-800 truncate">{product.title}</h3>
          <p className="text-blue-600 font-bold mt-1">₹{product.price}</p>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full mt-2 inline-block">
            {product.category}
          </span>
          <p className="text-xs text-gray-400 mt-1">by {product.seller?.name}</p>
        </div>
      </div>
    </Link>
  );
}