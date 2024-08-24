import { useState } from "react";
import PropTypes from "prop-types";

const FilterModal = ({ roles, teams, onApply, onClose }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [isRolesDropdownOpen, setIsRolesDropdownOpen] = useState(false);
  const [isTeamsDropdownOpen, setIsTeamsDropdownOpen] = useState(false);

  const handleApply = () => {
    const filterBy = selectedOption === "role" ? selectedRoles : selectedTeams;
    onApply(filterBy, selectedOption);
    onClose();
  };

  const handleClearFilters = () => {
    setSelectedRoles([]);
    setSelectedTeams([]);
    setSelectedOption("role");
    setIsRolesDropdownOpen(false);
    setIsTeamsDropdownOpen(false);
    onApply([], "none"); // Apply no filters
    onClose();
  };

  const handleSelectRoles = () => {
    if (selectedRoles.length === roles.length) {
      setSelectedRoles([]);
      setIsRolesDropdownOpen(false);
    } else {
      setSelectedRoles(roles);
      setIsRolesDropdownOpen(true);
    }
    setSelectedOption("role");
    setIsTeamsDropdownOpen(false);
  };
  const handleRoleChange = (role) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const handleTeamChange = (team) => {
    setSelectedTeams((prev) =>
      prev.includes(team) ? prev.filter((t) => t !== team) : [...prev, team]
    );
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Filter</h2>
        <div className="mb-4">
          <div>
            <label className="mb-2 flex items-center">
              <input
                type="checkbox"
                checked={selectedOption === "role"}
                onChange={(e) => handleSelectRoles(e.target.checked)}
                className="mr-2 accent-[#6941C6] w-4 h-4"
              />
              Role
            </label>
            {selectedOption === "role" && (
              <div
                className={`mt-2 ${
                  isRolesDropdownOpen ? "block" : "hidden"
                } px-6 rounded`}
              >
                {roles.map((role) => (
                  <div key={role} className="flex items-center mb-1">
                    <input
                      type="checkbox"
                      checked={selectedRoles.includes(role)}
                      onChange={() => handleRoleChange(role)}
                      className={`mr-2 accent-[#6941C6] w-4 h-4 ${
                        selectedRoles.includes(role) ? "bg-[#6941C6]" : ""
                      }`}
                    />
                    <label>{role}</label>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <label className="mb-2 flex items-center">
              <input
                type="checkbox"
                checked={selectedOption === "team"}
                onChange={() => {
                  setSelectedOption("team");
                  setSelectedTeams(teams);
                  setIsTeamsDropdownOpen(true);
                  setIsRolesDropdownOpen(false);
                }}
                className="mr-2 accent-[#6941C6] w-4 h-4"
              />
              Team
            </label>
            {selectedOption === "team" && (
              <div
                className={`mt-2 ${
                  isTeamsDropdownOpen ? "block" : "hidden"
                } px-6 rounded`}
              >
                {teams.map((team) => (
                  <div key={team} className="flex items-center mb-1">
                    <input
                      type="checkbox"
                      checked={selectedTeams.includes(team)}
                      onChange={() => handleTeamChange(team)}
                      className={`mr-2 accent-[#6941C6] w-4 h-4 ${
                        selectedTeams.includes(team) ? "bg-[#6941C6]" : ""
                      }`}
                    />
                    <label>{team}</label>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={handleClearFilters}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg"
          >
            Clear All Filters
          </button>
          <div className="flex">
            <button
              onClick={onClose}
              className="px-4 py-2 mr-2 bg-gray-200 text-gray-800 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="px-4 py-2 bg-[#6941C6] text-white rounded-lg"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

FilterModal.propTypes = {
  roles: PropTypes.array.isRequired,
  teams: PropTypes.array.isRequired,
  onApply: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default FilterModal;
