import { TbBell } from "react-icons/tb";

function Header() {
  return (
    <header className="flex justify-between items-center h-[60px] px-4 bg-white shadow-sm">
      {/* Brand Logo */}
      <div className="text-[#6941C6] text-[24px] font-[800]">PEOPLE.CO</div>

      {/* Right Side Icons */}
      <div className="flex items-center space-x-2">
        {/* Bell Icon */}
        <div className="p-1">
          <TbBell size={16} />
        </div>

        {/* User Avatar */}
        <img
          src="https://images.unsplash.com/photo-1624561172888-ac93c696e10c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjR8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D"
          alt="User Avatar"
          className="w-[28px] h-[28px] rounded-full object-cover"
        />

        {/* Username */}
        <span className="text-gray-700 text-sm font-medium">John Doe</span>
      </div>
    </header>
  );
}

export default Header;
