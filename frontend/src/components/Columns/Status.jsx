import PropTypes from "prop-types";

const Status = ({ isActive }) => (
  <div
    className={`flex items-center justify-center gap-2 text-xs py-1 px-2 border rounded-xl ${
      isActive
        ? "border-green-300 bg-green-50 text-green-600"
        : "border-red-300 bg-red-50 text-red-600"
    }`}
  >
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
