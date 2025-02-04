import { IoIosArrowForward } from "react-icons/io";
import { useState, useEffect } from "react";
import anh1 from "../../assets/Image/widget_banner.webp";

const SideBar = () => {
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [categories, setCategories] = useState([]);
  let timeout;

  // Fetch categories from the API when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8080/category');
        const data = await response.json();
        setCategories(data); // Assuming the API returns an array of categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleMouseEnter = (index) => {
    clearTimeout(timeout);
    setActiveSubMenu(index);
  };

  const handleMouseLeave = (index) => {
    setTimeout(() => {
      if (activeSubMenu === index) setActiveSubMenu(null);
    }, 1000);
  };

  return (
    <div className="bg-gray-100 p-4 w-[300px] relative">
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            className="relative flex justify-between items-center group cursor-pointer"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            <span>{category.name}</span>
            <IoIosArrowForward />

            {/* Submenu */}
            {activeSubMenu === index && category.subMenu && (
              <ul className="absolute top-0 left-full ml-2 bg-white shadow-lg p-2 rounded border z-50">
                {category.subMenu.map((item, subIndex) => (
                  <li
                    key={subIndex}
                    className="py-1 px-2 hover:bg-gray-300 rounded cursor-pointer"
                    onClick={() => alert(`Clicked on ${item}`)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <img src={anh1} alt="Banner" className="rounded shadow-lg" />
      </div>
      <ul>
        <li>Sách Mới Bán Chạy</li>
        <li className="p-4 border rounded shadow-md bg-white flex gap-2">
          <div className="relative inline-block mb-2">
            <span className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              10%
            </span>
          </div>

          <div>
            <img src={anh1} alt="Suleiman Vĩ đại" className="w-[100px] rounded" />
          </div>

          <div className="mt-2">
            <p className="font-medium text-gray-800">Suleiman Vĩ đại</p>

            <div className="flex items-center gap-2 mt-1">
              <p className="text-red-500 font-bold">231,200đ</p>
              <p className="line-through text-gray-500">289,200đ</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
