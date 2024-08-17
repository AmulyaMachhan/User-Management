import { forwardRef } from "react";
import PropTypes from "prop-types";
import { IoClose } from "react-icons/io5";
import { DateTime } from "luxon";

const SidePane = forwardRef(({ user, onClose }, ref) => {
  if (!user) return null;

  return (
    <div
      ref={ref}
      className="absolute top-0 right-0 w-[650px] h-full bg-white shadow-lg border border-gray-200 rounded-xl z-50"
    >
      <div className="bg-[#2A5B7E] text-white flex items-center justify-between p-4">
        <div className="flex items-start gap-4">
          <img
            src={user.profileImage}
            alt={user.name}
            className="w-24 h-24 rounded-full" // Adjusted width and height to 100px (24rem in Tailwind)
          />
          <div className="flex-grow">
            <div className="text-xl font-[700]">{user.name}</div>
            <div className="flex justify-between mt-2">
              <div>
                <p className="text-sm">{user.username}</p>
                <p className="text-sm">
                  <strong>User ID</strong>
                </p>
              </div>
              <div className="border-l border-white mx-4" />
              <div>
                <p className="text-sm">{user.role}</p>
                <p className="text-sm">Role</p>
              </div>
            </div>
          </div>
        </div>
        <button onClick={onClose} className="text-white hover:text-gray-300">
          <IoClose size={24} />
        </button>
      </div>
      <div className="p-4">
        <div className="mb-4">
          <div className="bg-[#EFF5FA] text-[#334155] p-2 font-semibold rounded-xl">
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
              <div key={label} className="flex border-b border-gray-200 py-3">
                <div className="flex-1 px-3 font-medium">{label}:</div>
                <div className="flex-1 px-3">{value}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="bg-[#EFF5FA] text-[#334155] p-2 font-semibold">
            Research and Publication
          </div>
          <div className="mt-2">
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
            <button className="mt-2 text-[#F15A22]">See Publication</button>
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
