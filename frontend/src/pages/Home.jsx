import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import { getProducts } from '../services/api';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  // Hero images with humans using skincare products
  const heroImages = [
    'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1556228578-abb8aee6e577?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=1200&h=600&fit=crop',
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch best sellers to show on home page
        const data = await getProducts({ bestSeller: 'true' });
        // Show up to 8 best sellers on home page
        setProducts(data.data.slice(0, 8));
      } catch (error) {
        console.error('Error fetching products:', error);
        // Fallback: fetch all products if best sellers fails
        try {
          const fallbackData = await getProducts();
          setProducts(fallbackData.data.slice(0, 6));
        } catch (fallbackError) {
          console.error('Error fetching fallback products:', fallbackError);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Auto-rotate hero images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const goToPrevSlide = () => {
    setCurrentHeroIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const goToNextSlide = () => {
    setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
  };

  const goToSlide = (index) => {
    setCurrentHeroIndex(index);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Carousel */}
      <section className="relative h-[600px] overflow-hidden">
        {/* Hero Images */}
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentHeroIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`Hero ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-black" />
        </button>
        <button
          onClick={goToNextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-black" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentHeroIndex
                  ? 'bg-white w-8'
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container-custom w-full">
            <div className="max-w-3xl mx-auto text-center text-white">
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 mb-6 border border-white/30">
                <span className="text-sm font-medium">New Collection</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Skincare Made Simple
              </h1>
              <p className="text-xl mb-8">
                Clean ingredients. Effective results. Discover your perfect routine.
              </p>
              <Link
                to="/products"
                className="inline-flex items-center space-x-2 bg-black hover:bg-gray-800 text-white px-8 py-4 font-semibold transition-colors"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2 text-black">Our Best Sellers</h2>
              <p className="text-gray-600">Handpicked favorites from our collection</p>
            </div>
            <Link
              to="/products"
              className="hidden md:flex items-center space-x-2 text-black hover:text-gray-600 font-medium"
            >
              <span>View All</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {loading ? (
            <Loader />
          ) : products.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600">No products available at the moment</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product, index) => (
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

          <div className="flex md:hidden justify-center mt-8">
            <Link
              to="/products"
              className="flex items-center space-x-2 text-black hover:text-gray-600 font-medium"
            >
              <span>View All Products</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12 text-black">Why Choose Minimalist</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-black">Clean Ingredients</h3>
              <p className="text-gray-600">
                Formulated with proven ingredients, free from harmful chemicals
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💚</span>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-black">Cruelty-Free</h3>
              <p className="text-gray-600">
                Never tested on animals. 100% vegan and ethical
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-black">Fast Delivery</h3>
              <p className="text-gray-600">
                Quick shipping and hassle-free returns
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
