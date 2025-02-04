import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { FaShoppingCart } from 'react-icons/fa';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const Nav = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    checkJWT();
    fetchCartCount();

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const checkJWT = () => {
    const jwt = Cookies.get("token");
    setIsAuthenticated(!!jwt);
    if (jwt) {
      fetchUserInfo(jwt);
    }
  };

  const fetchUserInfo = (jwt) => {
    axios.get("http://localhost:8080/user/profile", {
      headers: { Authorization: `Bearer ${jwt}`, "Content-Type": "application/json" },
    })
    .then((response) => {
      setUser(response.data);
    })
    .catch((error) => {
      console.error("Error fetching user info:", error);
    });
  };

  const fetchCartCount = async () => {
    try {
      // Retrieve the token using js-cookie
      const token = Cookies.get('token');
  
      if (!token) {
        throw new Error('No token found in cookies');
      }
  
      // Fetch cart data from the API with Authorization header
      const response = await fetch('http://localhost:8080/cart', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch cart data');
      }
  
      // Parse the response data
      const cart = await response.json();
      console.log("Cart data:", cart);
  
      // Calculate the total quantity
      const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0); 
      setCartCount(totalQuantity); 
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };
  

  const handleSignOut = () => {
    Cookies.remove("token");
    Cookies.remove("role");
    setIsAuthenticated(false);
    setIsMenuOpen(false);
    Nav('/signin');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="text-white bg-green-800 flex justify-between w-full h-10 items-center px-4">
      <div className="flex gap-4">
        <a href="tel:0338939456">0338939456</a>
        <a href="mailto:chinh8a9@gmail.com">chinh8a9@gmail.com</a>
        <span>15 Thôn Đồng, Dương Liễu, Hoài Đức, Hà Nội</span>
      </div>
      <div className="flex gap-4 items-center">
        {isAuthenticated ? (
          <div className="relative">
            <div className="avatar" onClick={toggleMenu}>
              <img
                src={user?.avatar || "https://i.pngimg.me/thumb/f/720/comdlpng6957537.jpg"}
                alt="Avatar"
                className="rounded-full w-8 h-8 cursor-pointer"
              />
            </div>
            {isMenuOpen && (
              <div ref={dropdownRef} className="absolute right-0 mt-2 p-4 bg-white text-black rounded-lg shadow-xl border border-gray-300 z-10">
                <button className="w-full text-left px-4 py-2 mb-2 text-sm font-semibold rounded-md hover:bg-gray-100 transition-colors duration-300">Thiết lập tài khoản</button>
                <button onClick={handleSignOut} className="w-full text-left px-4 py-2 text-sm font-semibold rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors duration-300">Đăng xuất</button>
              </div>
            )}
          </div>
        ) : (
          <>
            <button><a href="/signin">Đăng nhập</a></button>
            <button><a href="/signup">Đăng ký</a></button>
          </>
        )}
        <div className="relative cursor-pointer" onClick={() => Nav('/cart')}>
          <FaShoppingCart className="text-white text-2xl" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
              {cartCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
