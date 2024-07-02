import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 text-white md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBars size={24} />
      </button>
      <div className={`fixed top-0 left-0 z-40 h-screen pt-5 w-48 pr-3 max-md:bg-black border-r-2 border-[#242424] transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform md:translate-x-0`}>
        <aside className="text-white pt-11">
          <ul className="flex flex-col gap-11">
            <li>
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `block py-2 px-4 text-lg rounded-r-full font-bold font-monstserrat ${isActive ? "bg-gradient-to-b from-green-500 to-lime-400" : "bg-transparent hover:bg-gradient-to-b hover:from-green-500 hover:to-lime-400"}`
                }
              >
                DashBoard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/genres/create"
                className={({ isActive }) =>
                  `block py-2 px-4 text-lg rounded-r-full font-bold font-monstserrat ${isActive ? "bg-gradient-to-b from-green-500 to-lime-400" : "bg-transparent hover:bg-gradient-to-b hover:from-green-500 hover:to-lime-400"}`
                }
              >
                Manage Genre
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/media/create"
                className={({ isActive }) =>
                  `block py-2 px-4 text-lg rounded-r-full font-bold font-monstserrat ${isActive ? "bg-gradient-to-b from-green-500 to-lime-400" : "bg-transparent hover:bg-gradient-to-b hover:from-green-500 hover:to-lime-400"}`
                }
              >
                Create Media
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/media/manage"
                className={({ isActive }) =>
                  `block py-2 px-4 text-lg rounded-r-full font-bold font-monstserrat ${isActive ? "bg-gradient-to-b from-green-500 to-lime-400" : "bg-transparent hover:bg-gradient-to-b hover:from-green-500 hover:to-lime-400"}`
                }
              >
                Manage Media
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/reviews"
                className={({ isActive }) =>
                  `block py-2 px-4 text-lg rounded-r-full font-bold font-monstserrat ${isActive ? "bg-gradient-to-b from-green-500 to-lime-400" : "bg-transparent hover:bg-gradient-to-b hover:from-green-500 hover:to-lime-400"}`
                }
              >
                Comments
              </NavLink>
            </li>
          </ul>
        </aside>
      </div>
    </>
  );
};

export default SideBar;
