import logo from '../../assets/Image/logo.webp';
import GG from '../../assets/Image/gg.webp';
import FB from '../../assets/Image/fb.png';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [inputValue, setInputValue] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [error, setError] = useState("");
  const Nav = useNavigate();

  const handleOnChange = (e) => {
    setInputValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputValue.password !== inputValue.confirm_password) {
      setPasswordMatch(false);
      setError("Mật khẩu không trùng khớp!");
      showAlert("Error", "Mật khẩu không trùng khớp!", "error");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:8080/user/create",
        inputValue
      );
      if (res.data.error) {
        setError(res.data.error);
        showAlert("Error", res.data.error, "error");
        return;
      }
      Nav("/signin");
    } catch (error) {
      console.log("Error during login:", error);
      showAlert("Error", "Đăng ký thất bại.", "error");
    }
  };

  const showAlert = (title, text, icon) => {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonText: "OK",
    });
  };

    return (<section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                      <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
                      <p className='text-green-800'>Vina</p>
                      <p className='text-red-600'>Book</p>
                    </a>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Create an account
                    </h1>
                    <form className="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nhập username</label>
                            <input type="text" name="username" id="username" onChange={handleOnChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                        </div>
                        <div>
                            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nhập email</label>
                            <input type="email" name="email" id="email" onChange={handleOnChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nhập mật khẩu</label>
                            <input type="password" name="password" id="password" onChange={handleOnChange} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                        </div>
                        <div>
                            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nhập lại mật khẩu</label>
                            <input type="password" name="confirm_password" id="confirm_password" placeholder="••••••••" onChange={handleOnChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                        </div>
                        
                        <button type="button" onClick={handleSubmit} className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Tạo tài khoản</button>
                        <div className="flex items-center justify-center space-x-4 mt-4">
                                        <button className="w-full flex items-center justify-center bg-red-600 text-white rounded-lg px-5 py-2.5 hover:bg-red-700">
                                          <img src={GG} alt="Google" className="w-5 h-5 mr-2" />
                                          Đăng ký với Google
                                        </button>
                                        <button className="w-full flex items-center justify-center bg-blue-600 text-white rounded-lg px-5 py-2.5 hover:bg-blue-700">
                                          <img src={FB} alt="Facebook" className="w-5 h-5 mr-2" />
                                          Đăng ký với Facebook
                                        </button>
                                      </div>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Đã có tài khoản rồi? <a href="/signin" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Đăng nhập </a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
      </section>)
    
}

export default SignUp