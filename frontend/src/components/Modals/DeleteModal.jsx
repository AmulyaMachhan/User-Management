import PropTypes from "prop-types";

const DeleteModal = ({ onClose, onDelete }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">Delete Member Details</h2>
        <p className="mb-6">
          Are you sure you want to delete this Member{`'s`} details? This action
          cannot be undone.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 bg-[#6941C6] text-white rounded-lg hover:bg-[#53359e]"
          >
            Delete
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