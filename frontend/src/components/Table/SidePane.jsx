import PropTypes from "prop-types";
import { forwardRef } from "react";
import { CloseIcon, LinkIcon } from "../Icons/index";
import { DateTime } from "luxon";

const SidePane = forwardRef(({ user, onClose }, ref) => {
  if (!user) return null;

  return (
    <div
      ref={ref}
      className="absolute top-0 right-0 w-[600px] h-full bg-white shadow-lg border border-gray-200 rounded-xl z-10"
    >
      <div className="bg-[#2A5B7E] text-white flex items-center justify-between p-3 rounded-t-lg">
        <div className="flex items-start gap-3 py-2 px-2">
          <img
            src={user.profileImage}
            alt={user.name}
            className="w-20 h-20 rounded-full"
          />
          <div className="flex-grow">
            <div className="text-lg font-bold mb-3">{user.name}</div>
            <div className="flex justify-between mt-1 text-[#FFFCFC]">
              <div>
                <p className="text-xs font-[400] mb-1">@{user.username}</p>
                <p className="text-xs font-[500]">User ID</p>
              </div>
              <div className="border-l border-white mx-2" />
              <div>
                <p className="text-xs font-[400] mb-1">{user.role}</p>
                <p className="text-xs font-[500]">Role</p>
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
          <div className="bg-[#EFF5FA] text-[#334155] p-2 font-semibold rounded-lg">
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
              { label: "Contact Number", value: user.contactNo },
              { label: "Email Address", value: user.email },
              { label: "Work Email Address", value: user.workEmailAddress },
            ].map(({ label, value }) => (
              <div key={label} className="flex border-b border-gray-200 py-2">
                <div className="basis-2/5 px-2 font-medium text-sm text-[#101828]">
                  {label}
                </div>
                <div className="basis-3/5 px-2 text-md text-[#64748B] font-normal">
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="border-b-2 border-b-[#E2E8F0]">
          <div className="bg-[#EFF5FA] text-[#334155] p-2 font-semibold rounded-lg">
            Research and Publication
          </div>
          <div className="mt-2 text-sm p-3">
            <p className="font-[500] text-md mb-1.5 text-[#101828]">
              AI and User Experience: The Future of Design
            </p>
            <p className="text-[#475569] text-sm mb-1.5">
              Published in the Journal of Modern Design • 2022
            </p>
            <p className="text-[#334155]">
              AI, IoT based real time condition monitoring of Electrical
              Machines using Python language Abstract: Maintaining induction
              motors in good working order before they fail benefits small.
              <a href="" className=" text-[#F15A22]">
                {" "}
                See More...
              </a>
            </p>
            <button className="mt-2 text-[#F15A22] text-sm font-bold tracking-wider">
              <div className="flex items-center gap-2">
                <LinkIcon />
                SEE PUBLICATION
              </div>
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
  }),
  onClose: PropTypes.func.isRequired,
};

export default SidePane;
