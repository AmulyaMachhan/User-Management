import { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { CloseIcon, DropdownIcon } from "../Icons";

const FilterModal = ({ onApply, onClose }) => {
  const roles = useSelector((state) => state.role.roles);
  const teams = useSelector((state) => state.team.teams);

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
    setSelectedOption(null);
    setIsRolesDropdownOpen(false);
    setIsTeamsDropdownOpen(false);
    onApply([], "none");
    onClose();
  };

  const handleSelectRoles = () => {
    if (selectedRoles.length === roles.length) {
      setSelectedRoles([]);
    } else {
      setSelectedRoles(roles);
    }
    setSelectedOption("role");
    setIsTeamsDropdownOpen(false);
  };

  const handleSelectTeams = () => {
    if (selectedTeams.length === teams.length) {
      setSelectedTeams([]);
    } else {
      setSelectedTeams(teams);
    }
    setSelectedOption("team");
    setIsRolesDropdownOpen(false);
  };

  const handleRoleChange = (role) => {
    setSelectedRoles((prev) => {
      const newRoles = prev.includes(role)
        ? prev.filter((r) => r !== role)
        : [...prev, role];
      if (newRoles.length === 0) {
        setSelectedOption(null);
      }
      return newRoles;
    });
  };

  const handleTeamChange = (team) => {
    setSelectedTeams((prev) => {
      const newTeams = prev.includes(team)
        ? prev.filter((t) => t !== team)
        : [...prev, team];
      if (newTeams.length === 0) {
        setSelectedOption(null);
      }
      return newTeams;
    });
  };

  const toggleRolesDropdown = () => {
    setIsRolesDropdownOpen(!isRolesDropdownOpen);
    if (selectedOption !== "role") {
      setSelectedOption("role");
      setSelectedRoles(roles);
    }
    setIsTeamsDropdownOpen(false);
  };

  const toggleTeamsDropdown = () => {
    setIsTeamsDropdownOpen(!isTeamsDropdownOpen);
    if (selectedOption !== "team") {
      setSelectedOption("team");
      setSelectedTeams(teams);
    }
    setIsRolesDropdownOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-80">
        <div className="flex justify-between border-b pb-2 mb-3">
          <h2 className="text-md font-semibold">Filters</h2>
          <button onClick={onClose}>
            <CloseIcon color={"#616161"} height="10" width="10" />
          </button>
        </div>
        <div className="mb-4">
          <div>
            <div className="flex items-center">
              <label className="text-sm flex items-center">
                <input
                  type="checkbox"
                  checked={
                    selectedOption === "role" &&
                    selectedRoles.length === roles.length
                  }
                  onChange={handleSelectRoles}
                  className="mr-2 accent-[#6941C6] w-3 h-3"
                />
                Roles
              </label>
              <button
                onClick={toggleRolesDropdown}
                className="flex-grow h-5 flex justify-end"
              >
                <DropdownIcon height={5} width={12} />
              </button>
            </div>
            <div
              className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
                isRolesDropdownOpen ? "max-h-60" : "max-h-0"
              }`}
            >
              <div className="mt-2 px-6 rounded">
                {roles.map((role) => (
                  <div key={role} className="text-sm flex items-center mb-1">
                    <input
                      type="checkbox"
                      checked={selectedRoles.includes(role)}
                      onChange={() => handleRoleChange(role)}
                      className={`mr-2 accent-[#6941C6] w-3 h-3 border-[#475467] ${
                        selectedRoles.includes(role) ? "bg-[#6941C6]" : ""
                      }`}
                    />
                    <label className="text-[#475467]">{role}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center mt-2">
              <label className="text-sm flex items-center">
                <input
                  type="checkbox"
                  checked={
                    selectedOption === "team" &&
                    selectedTeams.length === teams.length
                  }
                  onChange={handleSelectTeams}
                  className="mr-2 accent-[#6941C6] w-3 h-3"
                />
                Teams
              </label>
              <button
                onClick={toggleTeamsDropdown}
                className="flex-grow h-5 flex justify-end"
              >
                <DropdownIcon height={5} width={12} />
              </button>
            </div>
            <div
              className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
                isTeamsDropdownOpen ? "max-h-60" : "max-h-0"
              }`}
            >
              <div className="mt-2 px-6 rounded">
                {teams.map((team) => (
                  <div key={team} className="text-sm flex items-center mb-1">
                    <input
                      type="checkbox"
                      checked={selectedTeams.includes(team)}
                      onChange={() => handleTeamChange(team)}
                      className={`mr-2 accent-[#6941C6] w-3 h-3 ${
                        selectedTeams.includes(team) ? "bg-[#6941C6]" : ""
                      }`}
                    />
                    <label className="text-[#475467]">{team}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-4 gap-2">
          <button
            onClick={handleClearFilters}
            className="px-2 py-2 bg-gray-200 text-gray-800 text-sm rounded-lg"
          >
            CLEAR
          </button>
          <button
            onClick={handleApply}
            className="px-4 py-2 bg-[#6941C6] text-white text-sm tracking-wider rounded-md"
          >
            SELECT
          </button>
        </div>
      </div>
    </div>
  );
};

FilterModal.propTypes = {
  onApply: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default FilterModal;
