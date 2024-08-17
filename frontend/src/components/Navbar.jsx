import { NavLink } from "react-router-dom";
import { IoGrid } from "react-icons/io5";

function Navbar() {
  return (
    <aside className="w-[240px] flex flex-col">
      <nav className="flex flex-col mt-8 space-y-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-3 text-gray-600 hover:text-[#6941C6] hover:bg-gray-200 ${
              isActive ? "text-[#6941C6]" : ""
            }`
          }
        >
          {/* Icon */}
          <div
            className={`flex items-center justify-center h-[24px] w-[24px]
          bg-black`}
          >
            <IoGrid size={18} color="white" />
          </div>
          Overview
        </NavLink>

        <NavLink
          to="/people-directory"
          className={({ isActive }) =>
            `flex gap-[8px] items-center px-4 py-3 text-gray-600 hover:text-[#6941C6] hover:bg-gray-200 ${
              isActive ? "text-[#6941C6]" : ""
            }`
          }
        >
          {/* Icon */}
          <div
            className={`flex items-center justify-center h-[24px] w-[24px]
          bg-black`}
          >
            <IoGrid size={18} color="white" />
          </div>
          People Directory
        </NavLink>
      </nav>
    </aside>
  );
}

export default Navbar;
