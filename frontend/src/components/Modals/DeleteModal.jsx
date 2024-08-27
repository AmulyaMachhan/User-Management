/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../redux/userSlice";
import { CloseIcon } from "../Icons";

const DeleteModal = ({
  user,
  setFilteredData,
  setModals,
  filteredData,
  setSelectedUser,
  setIsSidePaneOpen,
}) => {
  const dispatch = useDispatch();

  const handleConfirmDelete = () => {
    dispatch(deleteUser(user.id));
    setFilteredData(filteredData.filter((user) => user.id !== user.id));
    setModals((prev) => ({ ...prev, isDeleteModalOpen: false }));
    setSelectedUser(null);
    setIsSidePaneOpen(false);
  };

  const handleCloseModal = () => {
    setModals((prev) => ({ ...prev, isDeleteModalOpen: false }));
    setSelectedUser(null);
    setIsSidePaneOpen(true);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-md font-semibold">Delete Member Details</h2>
          <button onClick={handleCloseModal}>
            <CloseIcon color={"#616161"} height="10" width="10" />
          </button>
        </div>
        <p className="mb-6 text-sm">
          Are you sure you want to delete this Member{`'s`} details? This action
          cannot be undone.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={handleConfirmDelete}
            className="px-4 py-2 bg-[#6941C6] text-white text-sm tracking-wider font-bold rounded-lg hover:bg-[#53359e]"
          >
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
};

DeleteModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteModal;
