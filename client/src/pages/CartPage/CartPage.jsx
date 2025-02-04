import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { MdPhoneInTalk } from "react-icons/md";
import CartItem from './CartItem';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:8080/cart', {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        });
        console.log('API response:', response.data);
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCartItems();
  }, []);
  
  console.log('Cart items:', cartItems);  

  const handleUpdateQuantity = async (id, quantity) => {
    try {
      await axios.put(`http://localhost:8080/cart/${id}`, { quantity }, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
          'Content-Type': 'application/json',
        },
      });
      setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity } : item));
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });
      setCartItems(cartItems.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  if (loading) {
    return <p>Loading cart...</p>;
  }

  return (
    <div>
      <Header />
      <div className="flex justify-around items-center p-4 border-b border-gray-300">
        <div className="flex font-bold text-3xl cursor-pointer" onClick={() => navigate('/')}> 
          <h1 className="text-green-800">vina</h1>
          <h1 className="text-red-600">book</h1>
          <h1 className="text-green-800">.com</h1>
        </div>
        <div>
          <input type="text" placeholder="Tìm kiếm sách" className="border border-black w-[400px] h-[30px] px-2" />
          <button className="bg-black text-white h-[30px] w-[100px] ml-2">Tìm Kiếm</button>
        </div>
        <div className="flex items-center gap-2">
          <MdPhoneInTalk size={30} />
          <div>
            <h4>Tư vấn bán hàng</h4>
            <a href="tel:0338939456" className="text-blue-600">0338939456</a>
          </div>
        </div>
      </div>
      
      <h1 className="text-3xl font-semibold text-center my-6">Giỏ hàng của bạn</h1>
      {cartItems.length === 0 ? (
        <p className="text-lg text-center h-[800px]">Giỏ hàng của bạn đang trống.</p>
      ) : (
        <div className="max-w-3xl mx-auto">
          {cartItems.map(item => (
            <CartItem 
              key={item.id} 
              item={item} 
              onRemove={handleRemoveItem} 
              onUpdateQuantity={handleUpdateQuantity} 
            />
          ))}
          <div className="mt-4 text-right text-xl font-semibold">
            Tổng cộng: ${calculateTotal()}
          </div>
          <div className="mt-6 flex justify-between">
            <button onClick={() => navigate('/')} className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400">
              Tiếp tục mua sắm
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
              Thanh toán
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Cart;
