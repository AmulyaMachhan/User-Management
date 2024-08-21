/* eslint-disable react/prop-types */
import { flexRender } from "@tanstack/react-table";
import { DeleteIcon, EditIcon } from "../Icons";

const TableBody = ({
  table,
  rows,
  handleRowClick,
  setModals,
  setSelectedUser,
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
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className="py-3 px-3 text-left text-xs border-b font-[500]"
                onClick={header.column.getToggleSortingHandler()}
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
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
            <td className="py-2 px-2 border-t border-b">
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
