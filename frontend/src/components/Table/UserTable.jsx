import { IoSearch } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import PropTypes from "prop-types";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import Pagination from "./Pagination";
import SidePane from "./SidePane";
import EditProfileModal from "../Modals/EditProfileModal";
import DeleteModal from "../Modals/DeleteModal";
import FilterModal from "../Modals/FilterModal";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../redux/userSlice";

const UserTable = ({ data, columns, roles, teams }) => {
  const [filtering, setFiltering] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSidePaneOpen, setIsSidePaneOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filteredData, setFilteredData] = useState(data);

  const sidePaneRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidePaneRef.current && !sidePaneRef.current.contains(event.target)) {
        setIsSidePaneOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filtering,
    },
  });

  const rows = table.getRowModel().rows;

  const handleRowClick = (user) => {
    setSelectedUser(user);
    setIsSidePaneOpen(true); // Ensure the side pane opens every time a row is clicked
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
    setIsSidePaneOpen(false);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
    setIsSidePaneOpen(false);
  };

  const handleConfirmDelete = () => {
    console.log("Deleting user with ID:", selectedUser.id);
    dispatch(deleteUser(selectedUser.id));
    setFilteredData(filteredData.filter((user) => user.id !== selectedUser.id)); // Update filtered data
    setIsDeleteModalOpen(false);
    setSelectedUser(null);
    setIsSidePaneOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setIsSidePaneOpen(true);
  };

  const handleAddMember = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
    setIsSidePaneOpen(false);
  };

  const handleFilterApply = (filterBy, filterType) => {
    if (filterType === "none") {
      setFilteredData(data); // Show all users
    } else if (filterType === "role") {
      setFilteredData(data.filter((user) => filterBy.includes(user.role)));
    } else if (filterType === "team") {
      setFilteredData(
        data.filter((user) =>
          filterBy.some((team) => user.teams.includes(team))
        )
      );
    }
  };
  return (
    <div className="relative">
      <header className="flex items-center justify-between p-4 border-b border-[#E4E7EC] bg-white">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold">Team Members</h1>
          <div className="flex items-center px-3 py-1 gap-2 font-[600] text-[#6941C6] bg-[#F9F5FF] border border-[#E4E7EC] rounded-3xl">
            <span>{filteredData.length} users</span>
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
              <IoSearch size={20} color="#6941C6" />
            </button>
          </div>
          <button
            onClick={() => setIsFilterModalOpen(true)}
            className="p-2 rounded-full hover:bg-gray-200"
          >
            <svg
              width="22"
              height="20"
              viewBox="0 0 22 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 1H1L9 10.46V17L13 19V10.46L21 1Z"
                stroke="#0F172A"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={handleAddMember}
            className="flex items-center font-[500] tracking-wide gap-2 px-4 py-2 bg-[#6941C6] text-white rounded-lg"
          >
            <FaPlus size={20} />
            <span>ADD MEMBER</span>
          </button>
        </div>
      </header>
      {rows.length === 0 ? (
        <div className="p-4 text-center text-gray-600">No users found</div>
      ) : (
        <div>
          <table className="w-full mt-4">
            <thead className="table-header">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="py-3 px-4 text-left border-b"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => handleRowClick(row.original)}
                  className="table-row cursor-pointer hover:bg-gray-100"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="py-3 px-4 border-b">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                  <td className="py-3 px-4 border-b">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(row.original);
                      }}
                      className="mr-4 text-red-600"
                    >
                      <svg
                        width="18"
                        height="20"
                        viewBox="0 0 18 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.3333 4.99996V4.33329C12.3333 3.39987 12.3333 2.93316 12.1517 2.57664C11.9919 2.26304 11.7369 2.00807 11.4233 1.84828C11.0668 1.66663 10.6001 1.66663 9.66667 1.66663H8.33333C7.39991 1.66663 6.9332 1.66663 6.57668 1.84828C6.26308 2.00807 6.00811 2.26304 5.84832 2.57664C5.66667 2.93316 5.66667 3.39987 5.66667 4.33329V4.99996M7.33333 9.58329V13.75M10.6667 9.58329V13.75M1.5 4.99996H16.5M14.8333 4.99996V14.3333C14.8333 15.7334 14.8333 16.4335 14.5608 16.9683C14.3212 17.4387 13.9387 17.8211 13.4683 18.0608C12.9335 18.3333 12.2335 18.3333 10.8333 18.3333H7.16667C5.76654 18.3333 5.06647 18.3333 4.53169 18.0608C4.06129 17.8211 3.67883 17.4387 3.43915 16.9683C3.16667 16.4335 3.16667 15.7334 3.16667 14.3333V4.99996"
                          stroke="#475467"
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(row.original);
                      }}
                      className="text-blue-600"
                    >
                      <svg
                        width="19"
                        height="19"
                        viewBox="0 0 19 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.39662 15.0964C1.43491 14.7518 1.45405 14.5795 1.50618 14.4185C1.55243 14.2756 1.61778 14.1397 1.70045 14.0143C1.79363 13.873 1.91621 13.7504 2.16136 13.5053L13.1666 2.50005C14.0871 1.57957 15.5795 1.57957 16.4999 2.50005C17.4204 3.42052 17.4204 4.91291 16.4999 5.83338L5.49469 16.8386C5.24954 17.0838 5.12696 17.2063 4.98566 17.2995C4.86029 17.3822 4.72433 17.4475 4.58146 17.4938C4.42042 17.5459 4.24813 17.5651 3.90356 17.6033L1.08325 17.9167L1.39662 15.0964Z"
                          stroke="#475467"
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination table={table} />
        </div>
      )}
      {isModalOpen && (
        <EditProfileModal user={selectedUser} onClose={handleCloseModal} />
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={handleConfirmDelete}
        />
      )}
      {isFilterModalOpen && (
        <FilterModal
          roles={roles}
          teams={teams}
          onApply={handleFilterApply}
          onClose={() => setIsFilterModalOpen(false)}
        />
      )}
      {isSidePaneOpen && selectedUser && (
        <SidePane
          isOpen={isSidePaneOpen}
          onClose={() => setIsSidePaneOpen(false)}
          user={selectedUser}
          ref={sidePaneRef}
        />
      )}
    </div>
  );
};

UserTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  roles: PropTypes.array.isRequired,
  teams: PropTypes.array.isRequired,
};

export default UserTable;
