import PropTypes from "prop-types";

const Status = ({ isActive }) => (
  <div className="flex items-center justify-center gap-2 text-xs text-[#344054] font-[500] p-1 border border-[#D0D5DD] rounded-lg">
    <span
      className={`h-2 w-2 rounded-full ${
        isActive ? "bg-green-500" : "bg-red-500"
      }`}
    />
    {isActive ? "Active" : "Inactive"}
  </div>
);

Status.propTypes = {
  isActive: PropTypes.bool.isRequired,
};

export default Status;
