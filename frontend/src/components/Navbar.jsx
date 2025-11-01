import { Link } from 'react-router-dom';
import {
  ShoppingCart,
  Menu,
  X,
  User,
  LogOut,
  UserCircle,
} from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ onCartClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getCartCount } = useCart();
  const { isAuthenticated, user, logout } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="text-2xl font-bold text-black tracking-tight">Minimalist</div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-10">
            <Link
              to="/products"
              className="nav-link text-black hover:text-gray-600 transition-colors text-sm font-medium"
            >
              Shop
            </Link>
            <Link
              to="/best-sellers"
              className="nav-link text-black hover:text-gray-600 transition-colors text-sm font-medium"
            >
              Best Sellers
            </Link>
            <Link
              to="/skin-bodycare"
              className="nav-link text-black hover:text-gray-600 transition-colors text-sm font-medium"
            >
              Skin & Bodycare
            </Link>
            <Link
              to="/baby-care"
              className="nav-link text-black hover:text-gray-600 transition-colors text-sm font-medium"
            >
              Baby Care
            </Link>
            <Link
              to="/hair-care"
              className="nav-link text-black hover:text-gray-600 transition-colors text-sm font-medium"
            >
              Hair Care
            </Link>
            <Link
              to="/ai-assistants"
              className="nav-link text-black hover:text-gray-600 transition-colors text-sm font-medium"
            >
              AI Assistants
            </Link>
            <Link
              to="/track-order"
              className="nav-link text-black hover:text-gray-600 transition-colors text-sm font-medium"
            >
              Track Order
            </Link>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-8 ml-6 pl-6 border-l border-gray-200">
              <button
                onClick={onCartClick}
                className="cart-button relative flex items-center text-black hover:text-gray-600 transition-colors"
                aria-label="Open cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {getCartCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {getCartCount()}
                  </span>
                )}
              </button>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center text-black hover:text-gray-600 transition-colors text-sm font-medium"
                  >
                    <span className="hidden xl:inline">{user?.name}</span>
                  </Link>
                  <button
                    onClick={logout}
                    className="text-black hover:text-gray-600 transition-colors text-sm font-medium"
                    aria-label="Logout"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="text-black hover:text-gray-600 transition-colors text-sm font-medium"
                >
                  Login
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-4">
            <button
              onClick={onCartClick}
              className="relative"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-6 h-6 text-black" />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {getCartCount()}
                </span>
              )}
            </button>
            <button
              onClick={toggleMenu}
              className="p-2 text-black"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <div className="space-y-1">
              <Link
                to="/products"
                className="mobile-menu-item block py-2.5 text-black hover:bg-gray-50 transition-colors text-sm font-medium"
                onClick={toggleMenu}
              >
                Shop
              </Link>
              <Link
                to="/best-sellers"
                className="mobile-menu-item block py-2.5 text-black hover:bg-gray-50 transition-colors text-sm font-medium"
                onClick={toggleMenu}
              >
                Best Sellers
              </Link>
              <Link
                to="/skin-bodycare"
                className="mobile-menu-item block py-2.5 text-black hover:bg-gray-50 transition-colors text-sm font-medium"
                onClick={toggleMenu}
              >
                Skin & Bodycare
              </Link>
              <Link
                to="/baby-care"
                className="mobile-menu-item block py-2.5 text-black hover:bg-gray-50 transition-colors text-sm font-medium"
                onClick={toggleMenu}
              >
                Baby Care
              </Link>
              <Link
                to="/hair-care"
                className="mobile-menu-item block py-2.5 text-black hover:bg-gray-50 transition-colors text-sm font-medium"
                onClick={toggleMenu}
              >
                Hair Care
              </Link>
              <Link
                to="/ai-assistants"
                className="mobile-menu-item block py-2.5 text-black hover:bg-gray-50 transition-colors text-sm font-medium"
                onClick={toggleMenu}
              >
                AI Assistants
              </Link>
              <Link
                to="/track-order"
                className="mobile-menu-item block py-2.5 text-black hover:bg-gray-50 transition-colors text-sm font-medium"
                onClick={toggleMenu}
              >
                Track Order
              </Link>
              <div className="border-t border-gray-200 my-2"></div>
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className="mobile-menu-item block py-2.5 text-black hover:bg-gray-50 transition-colors text-sm font-medium"
                    onClick={toggleMenu}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      toggleMenu();
                    }}
                    className="mobile-menu-item block w-full text-left py-2.5 text-black hover:bg-gray-50 transition-colors text-sm font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="mobile-menu-item block py-2.5 text-black hover:bg-gray-50 transition-colors text-sm font-medium"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
