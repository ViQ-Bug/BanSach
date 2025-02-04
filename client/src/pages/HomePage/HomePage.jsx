import BookItem from "../../components/BookItem/BookItem";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header"
import { MdPhoneInTalk } from "react-icons/md";
import SideBar from "../../components/SideBar/SideBar";
import Banner from "../../components/Banner/Banner";

const HomePage = () => {
    return (
        <div>
            <Header></Header>
            <div className="flex justify-around items-center">
                <div className="flex font-bold text-3xl">
                <h1 className="text-green-800">vina</h1><h1 className="text-red-600">book</h1><h1 className="text-green-800">.com</h1>
                </div>
                <div>
                    <input type="text" placeholder="Tìm kiếm sách" className="border-[1px] border-black w-[400px] h-[30px]"/>
                    <button className="bg-black text-white h-[30px] w-[100px]">Tìm Kiếm</button>
                </div>
                <div className="flex items-center">
                    <div><MdPhoneInTalk size={30}/></div>
                    <div className="">
                        <h4>Tư vấn bán hàng</h4>
                        <a href="tel:0338939456">0338939456</a>
                    </div>
                </div>
            </div>
            <div className="flex ml-[300px] gap-4">
                <div><SideBar></SideBar></div>
                
                <div>
                    <div><Banner></Banner></div>
                    <h1>Sách Mới Nổi Bật</h1>
                    <BookItem></BookItem>
                </div>
            </div>
            
            <Footer></Footer>
        </div>
    )
}
export default HomePage