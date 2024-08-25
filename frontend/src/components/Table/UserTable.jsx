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
import {
  SearchIcon,
  FilterIcon,
  DeleteIcon,
  EditIcon,
  AddIcon,
} from "../Icons/index";

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
    const query = searchParams.get("query") || "";
    setFiltering(query);
    applySearchFilter(query);

    const filterRole = searchParams.get("role") || "";
    const filterTeam = searchParams.get("team") || "";
    handleFilterApply(filterRole.split(","), filterTeam.split(","));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, data]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (filtering) params.set("query", filtering);
    setSearchParams(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            onClick={handleAddMember}
            className="flex items-center font-[500] tracking-wide gap-2 px-4 py-2 bg-[#6941C6] text-white rounded-lg"
          >
            <AddIcon />
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
                      <DeleteIcon />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(row.original);
                      }}
                      className="text-[#6941C6]"
                    >
                      <EditIcon />
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
