import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const CartItem = ({ itemId }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartItem, setCartItem] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      const token = Cookies.get("token");
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/cart", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const foundItem = data.find(item => item.id === itemId) || null;
        setCartItem(foundItem);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setError("Error fetching product data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [itemId]);

  const updateQuantity = async (newQuantity) => {
    if (newQuantity < 1) return; 
    setLoading(true);
    const token = Cookies.get("token");
    try {
      const response = await fetch(`http://localhost:8080/cart/${itemId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      if (!response.ok) {
        throw new Error("Failed to update quantity");
      }

      setCartItem((prev) => ({ ...prev, quantity: newQuantity }));
    } catch (err) {
      console.error("Error updating quantity:", err);
      setError("Error updating quantity.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    setLoading(true);
    const token = Cookies.get("token");
    try {
      const response = await fetch(`http://localhost:8080/cart/${itemId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to remove item");
      }

      console.log("Item removed");
      setCartItem(null);
    } catch (err) {
      console.error("Error removing item:", err);
      setError("Error removing item.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!cartItem) {
    return <p>No items in the cart.</p>;
  }

  const { products, quantity } = cartItem;
  const { name, price, discount, stock, imageUrl } = products || {};
  const validPrice = price ? parseFloat(price) : 0;
  const priceAfterDiscount = validPrice * (1 - (discount / 100));

  return (
    <div className="flex items-center gap-4 p-4 border-b border-gray-300">
      <img
        src={imageUrl || "fallback-image.png"}
        alt={name || "Product"}
        className="w-16 h-16 object-cover rounded-md"
      />
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{name || "Product Name"}</h3>
        <p className="text-sm text-gray-500">Original Price: ${validPrice.toFixed(2)}</p>
        <p className="text-sm text-gray-500">Discount: {discount}%</p>
        <p className="text-sm text-green-600 font-semibold">Price After Discount: ${priceAfterDiscount.toFixed(2)}</p>
        <p className="text-sm text-gray-500">Stock: {stock}</p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => updateQuantity(quantity - 1)}
            disabled={loading}
            className="bg-yellow-500 text-white px-3 py-2 rounded-md hover:bg-yellow-600 transition"
          >
            {loading ? "Đang cập nhật..." : "-"}
          </button>
          <span className="text-lg">{quantity}</span>
          <button
            onClick={() => updateQuantity(quantity + 1)}
            disabled={loading}
            className="bg-yellow-500 text-white px-3 py-2 rounded-md hover:bg-yellow-600 transition"
          >
            {loading ? "Đang cập nhật..." : "+"}
          </button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <button
          onClick={handleRemove}
          disabled={loading}
          className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition"
        >
          {loading ? "Đang xóa..." : "Xóa"}
        </button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default CartItem;
