import React, { useState } from 'react';
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { MdPhoneInTalk } from "react-icons/md";
import anh1 from "../../assets/Image/widget_banner.webp";

const BookDetail = () => {
    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    const handleAddToCart = () => {
        // You can implement logic to add the item to a cart here
        console.log("Added to cart:", quantity);
    };

    const handleBuyNow = () => {
        // You can implement the purchase logic here
        console.log("Buying now:", quantity);
    };

    return (
        <div>
            <Header />
            <div className="flex justify-around items-center">
                <div className="flex font-bold text-3xl">
                    <h1 className="text-green-800">vina</h1>
                    <h1 className="text-red-600">book</h1>
                    <h1 className="text-green-800">.com</h1>
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Tìm kiếm sách"
                        className="border-[1px] border-black w-[400px] h-[30px]"
                    />
                    <button className="bg-black text-white h-[30px] w-[100px]">Tìm Kiếm</button>
                </div>
                <div className="flex items-center">
                    <div>
                        <MdPhoneInTalk size={30} />
                    </div>
                    <div>
                        <h4>Tư vấn bán hàng</h4>
                        <a href="tel:0338939456">0338939456</a>
                    </div>
                </div>
            </div>
            <div className="flex ml-[300px] gap-4"></div>
            <div className="flex flex-row justify-center">
                <div></div>
                <img src={anh1} className="w-[200px]" alt="Book cover" />
                <div>
                    <h1>Trò Chơi Tâm Lý Tiền Bạc</h1>
                    <p>Nhà sản xuất</p>
                    <p>
                        192,200đ <p className="line-through">249,000đ</p>
                    </p>
                    <div className="flex items-center">
                        <button onClick={increaseQuantity}>+</button>
                        <p>{quantity}</p>
                        <button onClick={decreaseQuantity}>-</button>
                    </div>
                    <br />
                    <button onClick={handleAddToCart}>THÊM VÀO GIỎ HÀNG</button>
                    <button onClick={handleBuyNow}>MUA NGAY</button>
                </div>

                <div>
                    <h2>Chỉ có ở Vinabook</h2>
                    <ul>
                        <li>Sản phẩm 100% chính hãng</li>
                        <li>Tư vấn mua sách trong giờ hành chính</li>
                        <li>Miễn phí vận chuyển cho đơn hàng từ 250.000đ</li>
                        <li>Hotline 1900 6401</li>
                    </ul>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default BookDetail;
