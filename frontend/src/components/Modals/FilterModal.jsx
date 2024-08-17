import { useState } from "react";
import PropTypes from "prop-types";

const FilterModal = ({ roles, teams, onApply, onClose }) => {
  const [selectedOption, setSelectedOption] = useState("role");
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
        <h2 className="text-xl font-semibold mb-4">Filter by</h2>
        <div className="mb-4">
          <div>
            <label className="block">
              <input
                type="radio"
                value="role"
                checked={selectedOption === "role"}
                onChange={(e) => setSelectedOption(e.target.value)}
              />
              Role
            </label>
            {selectedOption === "role" && (
              <button
                type="button"
                onClick={() => setIsRolesDropdownOpen(!isRolesDropdownOpen)}
                className="block w-full mt-2 text-left bg-gray-100 p-2 rounded"
              >
                {selectedRoles.length > 0
                  ? `Selected Roles: ${selectedRoles.join(", ")}`
                  : "Select Roles"}
              </button>
            )}
            {selectedOption === "role" && isRolesDropdownOpen && (
              <div className="mt-2 bg-gray-100 p-2 rounded">
                {roles.map((role) => (
                  <div key={role} className="flex items-center mb-1">
                    <input
                      type="checkbox"
                      checked={selectedRoles.includes(role)}
                      onChange={() => handleRoleChange(role)}
                      className="mr-2"
                    />
                    <label>{role}</label>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <label className="block">
              <input
                type="radio"
                value="team"
                checked={selectedOption === "team"}
                onChange={(e) => setSelectedOption(e.target.value)}
              />
              Team
            </label>
            {selectedOption === "team" && (
              <button
                type="button"
                onClick={() => setIsTeamsDropdownOpen(!isTeamsDropdownOpen)}
                className="block w-full mt-2 text-left bg-gray-100 p-2 rounded"
              >
                {selectedTeams.length > 0
                  ? `Selected Teams: ${selectedTeams.join(", ")}`
                  : "Select Teams"}
              </button>
            )}
            {selectedOption === "team" && isTeamsDropdownOpen && (
              <div className="mt-2 bg-gray-100 p-2 rounded">
                {teams.map((team) => (
                  <div key={team} className="flex items-center mb-1">
                    <input
                      type="checkbox"
                      checked={selectedTeams.includes(team)}
                      onChange={() => handleTeamChange(team)}
                      className="mr-2"
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
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
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
