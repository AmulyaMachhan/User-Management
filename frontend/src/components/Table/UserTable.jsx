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
import { useSearchParams } from "react-router-dom";
import FilterIcon from "../Icons/FilterIcon";

const UserTable = ({ data, columns, roles, teams }) => {
  const [filtering, setFiltering] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [modals, setModals] = useState({
    isModalOpen: false,
    isDeleteModalOpen: false,
    isFilterModalOpen: false,
  });
  const [isSidePaneOpen, setIsSidePaneOpen] = useState(true);
  const [filteredData, setFilteredData] = useState(data);

  const sidePaneRef = useRef(null);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // Parse URL parameters to set initial state
    const query = searchParams.get("query") || "";
    setFiltering(query);
    applySearchFilter(query);

    const filterRole = searchParams.get("role") || "";
    const filterTeam = searchParams.get("team") || "";
    handleFilterApply(filterRole.split(","), filterTeam.split(","));
  }, [searchParams, data]);

  useEffect(() => {
    // Update URL parameters based on the current state
    const params = new URLSearchParams();
    if (filtering) params.set("query", filtering);
    // Add other params like filters if applicable
    setSearchParams(params);
  }, [filtering, filteredData]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidePaneRef.current && !sidePaneRef.current.contains(event.target)) {
        setIsSidePaneOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { globalFilter: filtering },
  });

  const rows = table.getRowModel().rows;

  const handleRowClick = (user) => {
    setSelectedUser(user);
    setIsSidePaneOpen(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setModals((prev) => ({ ...prev, isModalOpen: true }));
    setIsSidePaneOpen(false);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setModals((prev) => ({ ...prev, isDeleteModalOpen: true }));
    setIsSidePaneOpen(false);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteUser(selectedUser.id));
    setFilteredData(filteredData.filter((user) => user.id !== selectedUser.id));
    setModals((prev) => ({ ...prev, isDeleteModalOpen: false }));
    setSelectedUser(null);
    setIsSidePaneOpen(true);
  };

  const handleCloseModal = () => {
    setModals((prev) => ({ ...prev, isModalOpen: false }));
    setSelectedUser(null);
    setIsSidePaneOpen(true);
  };

  const handleAddMember = () => {
    setSelectedUser(null);
    setModals((prev) => ({ ...prev, isModalOpen: true }));
    setIsSidePaneOpen(false);
  };

  const handleFilterApply = (filterBy, filterType) => {
    if (filterType === "none") {
      setFilteredData(data);
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

  const applySearchFilter = (query) => {
    if (query) {
      setFilteredData(
        data.filter((user) =>
          Object.values(user).some((val) =>
            val.toString().toLowerCase().includes(query.toLowerCase())
          )
        )
      );
    } else {
      setFilteredData(data);
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
              onChange={(e) => {
                setFiltering(e.target.value);
                applySearchFilter(e.target.value);
              }}
            />
            <button className="p-2 border-none bg-transparent">
              <IoSearch size={20} color="#6941C6" />
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
          <table className="w-full">
            <thead className="text-[#475467]">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="py-3 px-3 text-left text-sm border-b"
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
                  <td className="py-2 px-2 border-b">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(row.original);
                      }}
                      className="mr-2 text-red-600"
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 18 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.3333 4.99996V4.33329C12.3333 3.39987 12.3333 2.93316 12.1517 2.57664C11.9919 2.26304 11.7369 2.00807 11.4233 1.84828C11.0668 1.66663 10.6001 1.66663 9.66667 1.66663H8.33333C7.39991 1.66663 6.9332 1.66663 6.57668 1.84828C6.26308 2.00807 6.00811 2.26304 5.84832 2.57664C5.66667 2.93316 5.66667 3.39987 5.66667 4.33329V4.99996M7.33333 9.58329V13.75M10.6667 9.58329V13.75M1.5 4.99996H16.5M14.8333 4.99996V14.3333C14.8333 15.1338 14.5766 15.8837 14.0853 16.4357C13.6114 16.9647 12.7552 17.1666 11.8333 17.1666H6.16667C5.24478 17.1666 4.38861 16.9647 3.91472 16.4357C3.4234 15.8837 3.16667 15.1338 3.16667 14.3333V4.99996H14.8333Z"
                          stroke="black"
                          strokeWidth="1.5"
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
                      className="text-[#6941C6]"
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.7083 2.29167C16.1042 1.89583 16.5958 1.83333 16.9167 2.15417C17.25 2.475 17.25 3.01667 16.9167 3.375L7.08333 13.2083L3.33333 13.8333L4.00000 10.0833L13.8333 1.25000C14.2083 0.916667 14.75 0.916667 15.0833 1.25000L15.7083 2.29167Z"
                          stroke="black"
                          strokeWidth="1.5"
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
      {isSidePaneOpen && (
        <SidePane
          ref={sidePaneRef}
          user={selectedUser}
          onClose={() => setIsSidePaneOpen(false)}
        />
      )}
      {modals.isModalOpen && (
        <EditProfileModal
          user={selectedUser}
          onClose={handleCloseModal}
          onSave={(user) => {
            if (user.id) {
              // Update user
              setFilteredData(
                filteredData.map((u) => (u.id === user.id ? user : u))
              );
            } else {
              // Add user
              setFilteredData([...filteredData, user]);
            }
            handleCloseModal();
          }}
        />
      )}
      {modals.isDeleteModalOpen && (
        <DeleteModal
          user={selectedUser}
          onClose={() =>
            setModals((prev) => ({ ...prev, isDeleteModalOpen: false }))
          }
          onDelete={handleConfirmDelete}
        />
      )}
      {modals.isFilterModalOpen && (
        <FilterModal
          roles={roles}
          teams={teams}
          onApply={handleFilterApply}
          onClose={() =>
            setModals((prev) => ({ ...prev, isFilterModalOpen: false }))
          }
        />
      )}
    </div>
  );
};

UserTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  roles: PropTypes.array.isRequired,
  teams: PropTypes.object.isRequired,
};

export default UserTable;
