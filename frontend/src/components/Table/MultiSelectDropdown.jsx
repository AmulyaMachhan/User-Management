/* eslint-disable react/prop-types */
import { useState } from "react";
import { CloseIcon, DropdownIcon } from "../Icons";

const MultiSelectDropdown = ({
  options,
  selectedOptions,
  setSelectedOptions,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const addOption = (option) => {
    if (!selectedOptions.includes(option)) {
      const newSelection = [...selectedOptions, option];
      console.log("Adding Option:", option);
      setSelectedOptions(newSelection);
    }
  };

  const removeOption = (option) => {
    const newSelection = selectedOptions.filter((item) => item !== option);
    console.log("Removing Option:", option);
    setSelectedOptions(newSelection);
  };

  const clearAllOptions = () => {
    console.log("Clearing all options");
    setSelectedOptions([]);
  };

  return (
    <div className="relative">
      <div className="flex items-center border rounded-md p-1.5 text-sm">
        <div className="flex items-center flex-1 overflow-x-auto whitespace-nowrap gap-1">
          {selectedOptions.map((option) => (
            <div
              key={option}
              className="flex items-center gap-1 border border-[#E2E8F0] text-[#6941C6] text-xs px-1 py-0.5 rounded-md mr-1 mb-0 flex-shrink-0"
            >
              {option}
              <button
                type="button"
                className="ml-1 text-red-500"
                onClick={() => removeOption(option)}
              >
                <CloseIcon color={"#616161"} height={"8"} width={"8"} />
              </button>
            </div>
          ))}
          <input
            type="text"
            className="flex-grow p-1 focus:outline-none text-xs min-w-0"
            value={inputValue}
            onClick={toggleDropdown}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <div className="flex items-center ml-2 flex-shrink-0">
          <button
            type="button"
            className="text-gray-500"
            onClick={clearAllOptions}
          >
            <CloseIcon color={"#616161"} />
          </button>
          <button
            type="button"
            className="ml-3 text-gray-500"
            onClick={toggleDropdown}
          >
            <DropdownIcon />
          </button>
        </div>
      </div>
      {dropdownOpen && (
        <ul className="absolute top-full left-0 right-0 bg-white border rounded-md mt-1 z-10 text-xs">
          {options
            .filter((option) =>
              option.toLowerCase().includes(inputValue.toLowerCase())
            )
            .map((option) => (
              <li
                key={option}
                className="p-1 hover:bg-gray-200 cursor-pointer"
                onClick={() => {
                  addOption(option);
                  setInputValue("");
                  setDropdownOpen(false);
                }}
              >
                {option}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
