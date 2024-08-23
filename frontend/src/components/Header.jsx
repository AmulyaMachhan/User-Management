import { BellIcon } from "./Icons/index";

function Header() {
  return (
    <header className="flex justify-between items-center h-[60px] px-4 bg-white shadow-sm">
      <div className="text-[#6941C6] text-[24px] font-[800]">PEOPLE.CO</div>

      <div className="flex items-center space-x-2">
        <div className="p-1">
          <BellIcon />
        </div>

        <img
          src="https://images.unsplash.com/photo-1624561172888-ac93c696e10c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjR8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D"
          alt="User Avatar"
          className="w-[28px] h-[28px] rounded-full object-cover"
        />

        <span className="text-gray-700 text-sm font-medium">John Doe</span>
      </div>
    </header>
  );
}

export default Header;
