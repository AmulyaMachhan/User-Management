import PropTypes from "prop-types";

const Teams = ({ teams }) => {
  const colorSchemes = [
    { text: "#6941C6", bg: "#F9F5FF", border: "#E4E7EC" },
    { text: "#175CD3", bg: "#EFF8FF", border: "#B2DDFF" },
    { text: "#3538CD", bg: "#EEF4FF", border: "#C7D7FE" },
  ];

  const maxVisible = 3;
  const teamsToShow = teams.slice(0, maxVisible);
  const extraCount = teams.length > maxVisible ? teams.length - maxVisible : 0;

  return (
    <div className="flex flex-wrap gap-1 items-center">
      {teamsToShow.map((team, index) => {
        const { text, bg, border } = colorSchemes[index % colorSchemes.length];
        return (
          <div
            key={index}
            className="text-xs px-2 py-1 rounded-full"
            style={{ color: text, backgroundColor: bg, borderColor: border }}
          >
            {team}
          </div>
        );
      })}
      {extraCount > 0 && (
        <div className="text-xs px-2 py-1 rounded-full text-gray-600 border border-gray-300">
          +{extraCount}
        </div>
      )}
    </div>
  );
};

Teams.propTypes = {
  teams: PropTypes.object.isRequired,
};
export default Teams;
