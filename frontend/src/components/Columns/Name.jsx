import PropTypes from "prop-types";

const Name = ({
  profileImage,
  name,
  username,
  getIsSelected,
  isSidePaneOpen,
}) => (
  <div className="flex items-center gap-3">
    {isSidePaneOpen && (
      <input
        type="checkbox"
        checked={getIsSelected()}
        className="border border-[#D0D5DD]"
      />
    )}
    <img src={profileImage} alt={name} className="w-8 h-8 rounded-full" />
    <div>
      <div className="text-xs font-medium">{name}</div>
      <div className="text-xs text-gray-500">@{username}</div>
    </div>
  </div>
);

Name.propTypes = {
  profileImage: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  isSidePaneOpen: PropTypes.bool.isRequired,
  getIsSelected: PropTypes.func.isRequired,
};

export default Name;
