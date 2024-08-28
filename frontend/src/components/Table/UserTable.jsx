import PropTypes from "prop-types";
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import Pagination from "./Pagination";
import SidePane from "./SidePane";
import { EditProfileModal, DeleteModal, FilterModal } from "../Modals";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

const UserTable = ({ data, columns, overlapFromColumn, onSidePaneToggle }) => {
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
  const [searchParams, setSearchParams] = useSearchParams();

  const overlapIndex = columns.findIndex((col) => col.id === overlapFromColumn);

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
        onSidePaneToggle(false); // Notify parent component
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onSidePaneToggle]);

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
    onSidePaneToggle(true); // Notify parent component
  };

  const handleCloseModal = () => {
    setModals((prev) => ({ ...prev, isModalOpen: false }));
    setSelectedUser(null);
    setIsSidePaneOpen(true);
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
      <TableHeader
        filtering={filtering}
        setFiltering={setFiltering}
        filteredDataLength={filteredData.length}
        setModals={setModals}
      />
      {rows.length === 0 ? (
        <div className="p-4 text-center text-gray-600">No users found</div>
      ) : (
        <div>
          <TableBody
            table={table}
            rows={rows}
            handleRowClick={handleRowClick}
            setModals={setModals}
            setSelectedUser={setSelectedUser}
            overlapIndex={overlapIndex}
          />
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
          onDelete={() => {
            setFilteredData(
              filteredData.filter((u) => u.id !== selectedUser.id)
            );
            setSelectedUser(null);
            setModals((prev) => ({ ...prev, isDeleteModalOpen: false }));
          }}
        />
      )}
      {modals.isFilterModalOpen && (
        <FilterModal
          onClose={() =>
            setModals((prev) => ({ ...prev, isFilterModalOpen: false }))
          }
          onApply={(filterRole, filterTeam) => {
            handleFilterApply(filterRole, filterTeam);
            setModals((prev) => ({ ...prev, isFilterModalOpen: false }));
          }}
        />
      )}
    </div>
  );
};

UserTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  overlapFromColumn: PropTypes.string.isRequired,
  onSidePaneToggle: PropTypes.func.isRequired,
};

export default UserTable;
