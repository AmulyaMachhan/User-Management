/* eslint-disable react/prop-types */
import { SearchIcon, FilterIcon, AddIcon } from "../Icons";

const TableHeader = ({
  filtering,
  setFiltering,
  filteredDataLength,
  setModals,
}) => {
  return (
    <header className="flex items-center justify-between p-4 border-b border-[#E4E7EC] bg-white">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold">Team Members</h1>
        <div className="flex items-center px-3 py-1 gap-2 font-[600] text-[#6941C6] bg-[#F9F5FF] border border-[#E4E7EC] rounded-3xl">
          <span>{filteredDataLength} users</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center border rounded-lg overflow-hidden">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 border-none outline-none"
            value={filtering}
            onChange={(e) => setFiltering(e.target.value)}
          />
          <button className="p-2 border-none bg-transparent">
            <SearchIcon />
          </button>
        </div>
        <button
          onClick={() =>
            setModals((prev) => ({ ...prev, isFilterModalOpen: true }))
          }
          className="p-2 rounded-full hover:bg-gray-200"
        >
          <FilterIcon />
        </button>
        <button
          onClick={() => setModals((prev) => ({ ...prev, isModalOpen: true }))}
          className="flex items-center font-[500] tracking-wide gap-2 px-4 py-2 bg-[#6941C6] text-white rounded-lg"
        >
          <AddIcon />
          <span>ADD MEMBER</span>
        </button>
      </div>
    </header>
  );
};

export default TableHeader;
