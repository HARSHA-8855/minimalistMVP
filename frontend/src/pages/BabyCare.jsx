import { useEffect, useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import { getProducts } from '../services/api';
import { toast } from 'react-hot-toast';
import { ChevronDown } from 'lucide-react';

const BabyCare = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts({ category: 'Baby Care' });
        console.log('Baby Care API Response:', data);
        setProducts(data.data || []);
      } catch (error) {
        console.error('Error fetching baby care products:', error);
        toast.error('Failed to load baby care products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Sort products based on selected option
  const sortedProducts = useMemo(() => {
    const sorted = [...products];
    
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case 'rating':
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'newest':
        return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'featured':
      default:
        return sorted;
    }
  }, [products, sortBy]);

  return (
    <div className="min-h-screen py-12 animate-fadeIn">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Baby Care</h1>
          <p className="text-gray-600">
            Gentle, safe, and effective products for your little one's delicate skin
          </p>
        </div>

        {/* Sort by dropdown */}
        {!loading && products.length > 0 && (
          <div className="mb-6 flex items-center justify-end">
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm font-medium text-gray-700">
                Sort by:
              </label>
              <div className="relative">
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-black focus:border-black cursor-pointer transition-smooth"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name-asc">Name: A-Z</option>
                  <option value="name-desc">Name: Z-A</option>
                  <option value="rating">Rating: High to Low</option>
                  <option value="newest">Newest First</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <Loader />
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">
              No baby care products available
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product, index) => (
              <div 
                key={product._id} 
                className="animate-slideUp"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BabyCare;

