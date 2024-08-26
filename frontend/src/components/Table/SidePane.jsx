import PropTypes from "prop-types";
import { forwardRef } from "react";
import { CloseIcon } from "../Icons/index";
import { DateTime } from "luxon";

const SidePane = forwardRef(({ user, onClose }, ref) => {
  if (!user) return null;

  return (
    <div
      ref={ref}
      className="absolute top-0 right-0 w-[800px] h-full bg-white shadow-lg border border-gray-200 rounded-xl z-10"
    >
      <div className="bg-[#2A5B7E] text-white flex items-center justify-between p-3">
        <div className="flex items-start gap-3">
          <img
            src={user.profileImage}
            alt={user.name}
            className="w-20 h-20 rounded-full"
          />
          <div className="flex-grow">
            <div className="text-lg font-bold">{user.name}</div>
            <div className="flex justify-between mt-1">
              <div>
                <p className="text-sm">{user.username}</p>
                <p className="text-xs text-gray-400">
                  <strong>User ID</strong>
                </p>
              </div>
              <div className="border-l border-white mx-2" />
              <div>
                <p className="text-sm">{user.role}</p>
                <p className="text-xs text-gray-400">Role</p>
              </div>
            </div>
          </div>
        </div>
        <button onClick={onClose} className="text-white hover:text-gray-300">
          <CloseIcon />
        </button>
      </div>
      <div className="p-3">
        <div className="mb-3">
          <div className="bg-[#EFF5FA] text-[#334155] p-1 font-semibold rounded-lg">
            Personal Information
          </div>
          <div className="mt-2">
            {[
              {
                label: "Date of Birth",
                value: DateTime.fromISO(user.dob).toLocaleString(
                  DateTime.DATE_MED
                ),
              },
              { label: "Gender", value: user.gender },
              { label: "Nationality", value: user.nationality },
              { label: "Contact No.", value: user.contactNo },
              { label: "Email Address", value: user.email },
              { label: "Work Email Address", value: user.workEmailAddress },
            ].map(({ label, value }) => (
              <div key={label} className="flex border-b border-gray-200 py-2">
                <div className="flex-1 px-2 font-medium text-sm">{label}:</div>
                <div className="flex-1 px-2 text-sm">{value}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="bg-[#EFF5FA] text-[#334155] p-1 font-semibold rounded-lg">
            Research and Publication
          </div>
          <div className="mt-2 text-sm">
            <p>
              <strong>Topic:</strong> {user.researchTopic}
            </p>
            <p>
              <strong>Published In:</strong> {user.publishedIn}
            </p>
            <p>
              <strong>Year:</strong> {user.year}
            </p>
            <p>
              <strong>Summary:</strong> {user.summary}
            </p>
            <button className="mt-2 text-[#F15A22] text-sm">
              See Publication
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

// Set the displayName for the SidePane component
SidePane.displayName = "SidePane";

// Define PropTypes for SidePane
SidePane.propTypes = {
  user: PropTypes.shape({
    profileImage: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    dob: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    nationality: PropTypes.string.isRequired,
    contactNo: PropTypes.string.isRequired,
    workEmailAddress: PropTypes.string.isRequired,
    researchTopic: PropTypes.string.isRequired,
    publishedIn: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};

export default SidePane;
