import React, { useEffect, useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa6";
import anh1 from "../../assets/Image/widget_banner.webp"; // Fallback image

const BookItem = () => {
    const [products, setProducts] = useState([]);

    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:8080/product");
                const data = await response.json();
                setProducts(data); 
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        };

        fetchProducts();
    }, []);

    if (products.length === 0) {
        return <p>Loading...</p>;
    }

    return (
        <div className="flex flex-wrap gap-4 h-auto">
            {products.map((product) => {
                const { id, name, price, discount, image, category } = product;
                const discountedPrice = price - (price * discount) / 100;

                return (
                    <article key={id} className="p-4 border rounded-lg shadow-sm w-[200px] h-[300px] group relative">
                        {/* Discount Badge */}
                        <div className="relative inline-block">
                            <span className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                {discount}%
                            </span>

                            
                            <img
                                src={image || anh1}
                                alt={name}
                                className="w-full h-[160px] object-cover rounded-md ml-4"
                            />

                            
                            <div className="absolute inset-0 flex justify-center items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <button
                                    className="w-8 h-8 rounded-full border-[2px] bg-gray-500 border-gray-500 flex justify-center items-center mr-2"
                                    aria-label="Add to cart"
                                >
                                    <IoCartOutline />
                                </button>
                                <button
                                    className="w-8 h-8 rounded-full border-[2px] bg-gray-500 border-gray-500 flex justify-center items-center"
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
                                <p className="line-through text-gray-500">{price}đ</p>
                            </div>
                        </div>
                    </article>
                );
            })}
        </div>
    );
};

export default BookItem;
