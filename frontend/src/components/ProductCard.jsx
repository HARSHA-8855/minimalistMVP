import { Link } from 'react-router-dom';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = product.additionalImages && product.additionalImages.length > 0
    ? [product.imageUrl, ...product.additionalImages]
    : [product.imageUrl];

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  const goToPrevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const goToImage = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(index);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center -space-x-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="w-3.5 h-3.5 fill-black text-black" />
        ))}
        {hasHalfStar && (
          <div className="relative">
            <Star className="w-3.5 h-3.5 text-gray-300" />
            <Star className="w-3.5 h-3.5 fill-black text-black absolute left-0 top-0" style={{ clipPath: 'inset(0 50% 0 0)' }} />
          </div>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="w-3.5 h-3.5 text-gray-300" />
        ))}
      </div>
    );
  };

  return (
    <Link
      to={`/products/${product._id}`}
      className="group bg-white block hover-lift transition-smooth"
    >
      {/* Product Image with Navigation */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        <img
          src={images[currentImageIndex]}
          alt={product.name}
          className="w-full h-full object-cover transition-opacity duration-300"
          loading="lazy"
          decoding="async"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/500x500?text=Product+Image';
          }}
        />
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-sm"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4 text-gray-700" />
            </button>
            <button
              onClick={goToNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-sm"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4 text-gray-700" />
            </button>
          </>
        )}

        {/* Dots Indicator */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => goToImage(e, index)}
                className={`h-1 transition-all rounded-full ${
                  index === currentImageIndex
                    ? 'w-6 bg-gray-700'
                    : 'w-1 bg-gray-400 hover:bg-gray-600'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Info - All Left Aligned, Exact Structure */}
      <div className="px-4 pb-4 pt-3">
        {/* Product Name - Left Aligned */}
        <h3 className="text-sm font-medium text-left text-black mb-1.5 leading-tight">
          {product.name}
        </h3>

        {/* Description/Benefit - Left Aligned, Smaller Font */}
        <p className="text-xs text-gray-600 text-left mb-2 leading-tight font-normal">
          {product.description}
        </p>

        {/* Rating - Left Aligned, Black Filled Stars */}
        <div className="mb-2">
          {product.rating > 0 ? (
            renderStars(product.rating)
          ) : (
            renderStars(3.5)
          )}
        </div>

        {/* Price - Left Aligned */}
        <div className="mb-3">
          <p className="text-xs text-black font-normal">
            On Sale from <span className="font-medium">₹ {product.price}</span>
          </p>
        </div>

        {/* Action Button - Full Width Black Button */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-black hover:bg-gray-800 text-white py-2.5 text-xs font-medium transition-colors"
          aria-label="Add to cart"
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
