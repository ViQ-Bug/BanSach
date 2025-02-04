import React, { useEffect, useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa6";
import anh1 from "../../assets/Image/widget_banner.webp"; // Fallback image

const BookItem = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:8080/product");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching product data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = async (product) => {
        const token = localStorage.getItem("token") || getCookie("token");
    
        if (!token) {
            alert("Bạn cần đăng nhập để thực hiện thao tác này.");
            return;
        }
    
        // Check if the product already exists in the cart (locally)
        const existingProduct = cart.find(item => item.id === product.id);
        let updatedCart = [...cart];
    
        try {
            if (existingProduct) {
                // If the product already exists, increase the quantity by 1 in the local state
                updatedCart = cart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
    
                // Send the updated quantity to the server
                const response = await fetch(`http://localhost:8080/cart/${product.id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        quantity: existingProduct.quantity + 1, // Increase by 1
                    }),
                });
    
                if (!response.ok) {
                    throw new Error("Failed to update cart");
                }
            } else {
                // If the product doesn't exist in the cart, add it with quantity 1
                updatedCart = [...cart, { ...product, quantity: 1 }];
                
                // Send the new product with quantity 1 to the server
                const response = await fetch(`http://localhost:8080/cart/${product.id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        quantity: 1, // Initially set to 1
                    }),
                });
    
                if (!response.ok) {
                    throw new Error("Failed to add product to cart");
                }
            }
    
            // Update the local cart state
            setCart(updatedCart);
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            alert("Sản phẩm đã được thêm vào giỏ hàng!");
        } catch (error) {
            console.error("Error with cart operation:", error);
        }
    };
    
    
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
        return null;
    };

    if (loading) {
        return <p>Đang tải sản phẩm...</p>;
    }

    return (
        <div className="flex flex-wrap gap-4 h-auto">
            {products.map((product) => {
                const { id, name, price, discount, image, category } = product;
                const discountedPrice = (price - (price * discount) / 100).toFixed(2);

                return (
                    <article key={id} className="p-4 border rounded-lg shadow-sm w-[200px] h-[300px] group relative">
                        <div className="relative inline-block">
                            {discount > 0 && (
                                <span className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                    -{discount}%
                                </span>
                            )}

                            <img
                                src={image || anh1}
                                alt={name}
                                className="w-full h-[160px] object-cover rounded-md"
                            />

                            <div className="absolute inset-0 flex justify-center items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <button
                                    className="w-8 h-8 rounded-full border-[2px] bg-gray-500 border-gray-500 flex justify-center items-center mr-2 hover:bg-gray-700"
                                    aria-label="Add to cart"
                                    onClick={() => handleAddToCart(product)}
                                >
                                    <IoCartOutline />
                                </button>
                                <button
                                    className="w-8 h-8 rounded-full border-[2px] bg-gray-500 border-gray-500 flex justify-center items-center hover:bg-gray-700"
                                    aria-label="View details"
                                >
                                    <FaRegEye />
                                </button>
                            </div>
                        </div>

                        <div className="mt-4">
                            <h3 className="font-semibold text-lg">{name}</h3>
                            <p className="text-sm text-gray-500">{category.name}</p>
                            <div className="flex items-center gap-2 mt-2">
                                <p className="text-red-500 font-bold">{discountedPrice}đ</p>
                                {discount > 0 && <p className="line-through text-gray-500">{price.toFixed(2)}đ</p>}
                            </div>
                        </div>
                    </article>
                );
            })}
        </div>
    );
};

export default BookItem;
