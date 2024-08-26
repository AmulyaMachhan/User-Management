/* eslint-disable react/prop-types */
import { flexRender } from "@tanstack/react-table";
import { DeleteIcon, EditIcon } from "../Icons";

const TableBody = ({
  table,
  rows,
  handleRowClick,
  setModals,
  setSelectedUser,
  overlapIndex,
}) => {
  const handleEdit = (user) => {
    setSelectedUser(user);
    setModals((prev) => ({ ...prev, isModalOpen: true }));
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setModals((prev) => ({ ...prev, isDeleteModalOpen: true }));
  };

  return (
    <table className="w-full">
      <thead className="text-[#475467] font-[500]">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header, index) => (
              <th
                key={header.id}
                className={
                  index > overlapIndex
                    ? "relative z-0 py-3 px-3 text-left text-sm border-b"
                    : "py-3 px-3 text-left text-sm border-b"
                }
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
            {row.getVisibleCells().map((cell, index) => (
              <td
                key={cell.id}
                className={
                  index > overlapIndex
                    ? "py-3 px-4 border-b relative z-0"
                    : "py-3 px-4 border-b"
                }
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
  );
};

export default TableBody;
