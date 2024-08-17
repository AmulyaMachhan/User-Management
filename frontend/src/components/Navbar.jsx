import { NavLink } from "react-router-dom";
import { IoGrid } from "react-icons/io5";

function Navbar() {
  return (
    <aside className="w-[200px] flex flex-col">
      <nav className="flex flex-col mt-6 space-y-3 text-sm">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-2 px-5 py-2 text-gray-600 hover:text-[#6941C6] hover:bg-gray-200 ${
              isActive ? "text-[#6941C6]" : ""
            }`
          }
        >
          {/* Icon */}
          <div
            className={`flex items-center justify-center h-[20px] w-[20px]
          bg-black`}
          >
            <IoGrid size={16} color="white" />
          </div>
          Overview
        </NavLink>

        <NavLink
          to="/people-directory"
          className={({ isActive }) =>
            `flex gap-2 items-center px-5 py-2 text-gray-600 hover:text-[#6941C6] hover:bg-gray-200 ${
              isActive ? "text-[#6941C6]" : ""
            }`
          }
        >
          {/* Icon */}
          <div
            className={`flex items-center justify-center h-[20px] w-[20px]
          bg-black`}
          >
            <IoGrid size={16} color="white" />
          </div>
          People Directory
        </NavLink>
      </nav>
    </aside>
  );
}

export default Navbar;