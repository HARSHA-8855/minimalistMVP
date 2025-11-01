import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import { getProducts } from '../services/api';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'All';
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(categoryParam);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Cleanser', 'Serum', 'Moisturizer', 'Sunscreen', 'Mask', 'Treatment', 'Toner'];

  // Update filter when URL param changes
  useEffect(() => {
    setFilter(categoryParam);
  }, [categoryParam]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = {};
        if (categoryParam && categoryParam !== 'All') {
          params.category = categoryParam;
        }
        const data = await getProducts(params);
        setProducts(data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryParam]);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = filter === 'All' || product.category === filter;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen py-12 animate-fadeIn">
      <div className="container-custom">
        <div className="mb-8 animate-slideLeft">
          <h1 className="text-4xl font-bold mb-4">All Products</h1>
          <p className="text-gray-600">
            Discover our complete collection of skincare essentials
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4 animate-slideLeft">
          {/* Search Bar */}
          <div className="max-w-md">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setFilter(category);
                  if (category === 'All') {
                    setSearchParams({});
                  } else {
                    setSearchParams({ category });
                  }
                }}
                    className={`px-4 py-2 font-medium transition-colors ${
                      filter === category
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                    }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <Loader />
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">
              No products found matching your criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
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

export default Products;

