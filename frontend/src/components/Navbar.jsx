import { NavLink, useLocation } from "react-router-dom";
import { GridIcon } from "./Icons/index";

function Navbar() {
  const location = useLocation();

  return (
    <aside className="w-[200px] flex flex-col">
      <nav className="flex flex-col mt-6 space-y-3 text-sm">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-2 px-5 py-2  hover:bg-gray-200 ${
              isActive ? "text-[#6941C6]" : "text-gray-600"
            }`
          }
        >
          {/* Icon */}
          <div>
            <GridIcon color={location.pathname === "/" ? "#6941C6" : "black"} />
          </div>
          Overview
        </NavLink>

        <NavLink
          to="/people-directory"
          className={({ isActive }) =>
            `flex gap-2 items-center px-5 py-2 hover:bg-gray-200 ${
              isActive ? "text-[#6941C6]" : "text-gray-600"
            }`
          }
        >
          {/* Icon */}
          <div>
            <GridIcon
              color={
                location.pathname === "/people-directory" ? "#6941C6" : "black"
              }
            />
          </div>
          People Directory
        </NavLink>
      </nav>
    </aside>
  );
}

export default Navbar;
