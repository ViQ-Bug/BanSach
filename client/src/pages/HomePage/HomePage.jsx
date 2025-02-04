import BookItem from "../../components/BookItem/BookItem";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header"
import { MdPhoneInTalk } from "react-icons/md";
import SideBar from "../../components/SideBar/SideBar";
import Banner from "../../components/Banner/Banner";
import { useNavigate } from "react-router-dom";

const HomePage = () => {

    const navigate = useNavigate();
    return (
        <div>
            <Header></Header>
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