import logo from '../../assets/Image/logo.webp';
import GG from '../../assets/Image/gg.webp';
import FB from '../../assets/Image/fb.png';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';


const SignIn = () => {
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
  });
  const Nav = useNavigate();
  const handleOnChange = (e) => {
    setInputValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await axios.post("http://localhost:8080/auth/login", inputValue, {
        withCredentials: true,
      });
  
      if (!res.data || !res.data.token) {
        throw new Error("Không nhận được token từ server");
      }
  
      const token = res.data.token;
      const role = res.data.role;
      Cookies.set("token", token, { expires: 1 }); 
      Cookies.set("role", role, { expires: 1 });
  
      Swal.fire({
        icon: "success",
        title: "Đăng nhập thành công",
      });
  
      role === "Admin" ? Nav("/admin") : Nav("/");
      
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Lỗi đăng nhập!",
      });
    }
  };
  

  useEffect(() => {}, []);
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
          <p className='text-green-800'>Vina</p>
          <p className='text-red-600'>Book</p>
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleOnChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={handleOnChange}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">  
                </div>  
              </div>
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Đăng Nhập
              </button>
              <div className="flex items-center justify-center space-x-4 mt-4">
                <button className="w-full flex items-center justify-center bg-red-600 text-white rounded-lg px-5 py-2.5 hover:bg-red-700">
                  <img src={GG} alt="Google" className="w-5 h-5 mr-2" />
                  Đăng nhập với Google
                </button>
                <button className="w-full flex items-center justify-center bg-blue-600 text-white rounded-lg px-5 py-2.5 hover:bg-blue-700">
                  <img src={FB} alt="Facebook" className="w-5 h-5 mr-2" />
                  Đăng nhập với Facebook
                </button>
              </div>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Chưa có tài khoản? <a href="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Đăng ký</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
