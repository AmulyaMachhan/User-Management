import { useState } from "react";

/* eslint-disable react/prop-types */
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

  return (
    <div className="relative">
      <div className="flex items-center flex-wrap border rounded-md p-2">
        {selectedOptions.map((option) => (
          <div
            key={option}
            className="flex items-center border border-[#E2E8F0] text-[#6941C6] text-sm px-2 py-1 rounded-lg mr-2 mb-2"
          >
            {option}
            <button
              type="button"
              className="ml-2 text-red-500"
              onClick={() => removeOption(option)}
            >
              <svg
                width="9"
                height="10"
                viewBox="0 0 9 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.146447 0.646447C0.341709 0.451184 0.658291 0.451184 0.853553 0.646447L4.5 4.29289L8.14645 0.646447C8.34171 0.451184 8.65829 0.451184 8.85355 0.646447C9.04882 0.841709 9.04882 1.15829 8.85355 1.35355L5.20711 5L8.85355 8.64645C9.04882 8.84171 9.04882 9.15829 8.85355 9.35355C8.65829 9.54882 8.34171 9.54882 8.14645 9.35355L4.5 5.70711L0.853553 9.35355C0.658291 9.54882 0.341709 9.54882 0.146447 9.35355C-0.0488155 9.15829 -0.0488155 8.84171 0.146447 8.64645L3.79289 5L0.146447 1.35355C-0.0488155 1.15829 -0.0488155 0.841709 0.146447 0.646447Z"
                  fill="#475569"
                />
              </svg>
            </button>
          </div>
        ))}
        <input
          type="text"
          className="flex-grow p-2 focus:outline-none"
          placeholder="Select teams"
          value={inputValue}
          onClick={toggleDropdown}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          type="button"
          className="ml-2 text-gray-500"
          onClick={toggleDropdown}
        >
          <svg
            width="16"
            height="9"
            viewBox="0 0 16 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.21967 0.46967C0.512563 0.176777 0.987437 0.176777 1.28033 0.46967L8 7.18934L14.7197 0.46967C15.0126 0.176777 15.4874 0.176777 15.7803 0.46967C16.0732 0.762563 16.0732 1.23744 15.7803 1.53033L8.53033 8.78033C8.23744 9.07322 7.76256 9.07322 7.46967 8.78033L0.21967 1.53033C-0.0732233 1.23744 -0.0732233 0.762563 0.21967 0.46967Z"
              fill="#616161"
            />
          </svg>
        </button>
      </div>
      {dropdownOpen && (
        <ul className="absolute top-full left-0 right-0 bg-white border rounded-md mt-2 z-10">
          {options
            .filter((option) =>
              option.toLowerCase().includes(inputValue.toLowerCase())
            )
            .map((option) => (
              <li
                key={option}
                className="p-2 hover:bg-gray-200 cursor-pointer"
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
