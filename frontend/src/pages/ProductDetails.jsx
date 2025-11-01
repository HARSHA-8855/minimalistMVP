import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Star, CheckCircle, Info } from 'lucide-react';
import Loader from '../components/Loader';
import { getProductById } from '../services/api';
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data.data);
      } catch (error) {
        toast.error('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center space-x-1">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && (
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" style={{ clipPath: 'inset(0 50% 0 0)' }} />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-gray-300" />
        ))}
      </div>
    );
  };

  if (loading) {
    return <Loader />;
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <Link to="/products" className="text-black hover:underline">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const images = product.additionalImages && product.additionalImages.length > 0
    ? [product.imageUrl, ...product.additionalImages]
    : [product.imageUrl];

  return (
    <div className="min-h-screen py-8">
      <div className="container-custom max-w-7xl">
        <Link
          to="/products"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-black mb-6 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="aspect-square overflow-hidden bg-gray-50 mb-4">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {images.length > 1 && (
              <div className="flex space-x-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-20 overflow-hidden border-2 ${
                      selectedImage === idx ? 'border-black' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            {/* Brand */}
            <p className="text-sm text-gray-600 mb-2">Minimalist</p>
            
            {/* Product Name */}
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-black">
              {product.name}
            </h1>

            {/* Rating */}
            {product.rating > 0 && (
              <div className="flex items-center space-x-3 mb-4">
                {renderStars(product.rating)}
                <span className="text-sm text-gray-600">
                  {product.rating.toFixed(1)} ({product.reviewCount} Reviews)
                </span>
              </div>
            )}

            {/* Key Benefits */}
            {product.keyBenefits && product.keyBenefits.length > 0 && (
              <p className="text-sm text-gray-700 mb-4 font-medium">
                {product.keyBenefits.join(', ')}
              </p>
            )}

            {/* Description */}
            <p className="text-gray-700 mb-6 leading-relaxed">
              {product.detailedDescription || product.description}
            </p>

            {/* Certifications/Safety */}
            {product.certifications && product.certifications.length > 0 && (
              <div className="mb-6 p-4 bg-gray-50 border-l-4 border-black">
                <p className="text-sm text-gray-700 mb-2 font-semibold">
                  Proven Safe: {product.certifications.join(', ')}
                </p>
                <p className="text-xs text-gray-600">
                  All tests are conducted on humans in presence of a certified Dermatologist in an Independent lab.
                </p>
              </div>
            )}

            {/* Special Offer */}
            <div className="bg-black text-white px-4 py-2 mb-6 flex items-center space-x-2 text-sm">
              <Info className="w-4 h-4" />
              <span>Get ₹{Math.round(product.price * 0.1)} worth of MCash post-delivery.</span>
            </div>

            {/* Free From */}
            {product.freeFrom && product.freeFrom.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold mb-2 text-black">Free From:</h3>
                <div className="grid grid-cols-2 gap-2">
                  {product.freeFrom.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-gray-700">{item} Free</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pricing */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <p className="text-xs font-semibold text-gray-600 mb-2">PRICE</p>
              <div className="flex items-baseline space-x-3">
                {product.mrp && product.mrp > product.price ? (
                  <>
                    <span className="text-lg text-gray-500 line-through">MRP ₹{product.mrp}</span>
                    <span className="text-2xl font-bold text-black">₹{product.price}</span>
                    {product.discountPercentage > 0 && (
                      <span className="text-sm text-gray-600">
                        {product.discountPercentage}% Off
                      </span>
                    )}
                  </>
                ) : (
                  <span className="text-2xl font-bold text-black">₹{product.price}</span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">(incl. of all taxes)</p>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="mb-8">
              <label className="block text-sm font-medium mb-2 text-black">Quantity</label>
              <div className="flex items-center space-x-4 mb-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 hover:bg-gray-100 text-lg"
                >
                  −
                </button>
                <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-gray-300 hover:bg-gray-100 text-lg"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="w-full bg-black hover:bg-gray-800 text-white py-4 font-semibold text-sm transition-colors"
              >
                ADD TO CART
              </button>
            </div>

            {/* What Makes It Special */}
            {(product.specialFeatures && product.specialFeatures.length > 0) || product.size ? (
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold mb-3 text-black cursor-pointer hover:underline">
                  What Makes It Special?
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  {product.specialFeatures && product.specialFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                  {product.size && (
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Size: {product.size}</span>
                    </li>
                  )}
                </ul>
              </div>
            ) : null}

            {/* Ingredients */}
            {product.ingredients && product.ingredients.length > 0 && (
              <div className="border-t border-gray-200 pt-6 mt-6">
                <h3 className="font-semibold mb-3 text-black">Key Ingredients:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ingredient, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-100 text-sm text-gray-700 border border-gray-200"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
