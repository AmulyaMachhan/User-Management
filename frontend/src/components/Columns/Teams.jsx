import PropTypes from "prop-types";

const Teams = ({ teams }) => {
  const colorSchemes = [
    { text: "#6941C6", bg: "#F9F5FF", border: "#E9D7FE" },
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
            className={`text-[0.7rem] px-1.5 py-0.5 rounded-full border border-[${border}]`}
            style={{ color: text, backgroundColor: bg, borderColor: border }}
          >
            {team}
          </div>
        );
      })}
      {extraCount > 0 && (
        <div className="text-[0.7rem] px-1.5 py-0.5 font-[500] rounded-xl text-[#344054 ] border border-gray-300">
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
