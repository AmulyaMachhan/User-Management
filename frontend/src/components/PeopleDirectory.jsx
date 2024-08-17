import { useMemo } from "react";
import { useSelector } from "react-redux";
import { createColumnHelper } from "@tanstack/react-table";
import UserTable from "./Table/UserTable";

const PeopleDirectory = () => {
  const users = useSelector((state) => state.user.users);
  const roles = useSelector((state) => state.role.roles);
  const teams = useSelector((state) => state.team.teams);

  const data = useMemo(() => users, [users]);
  const columnHelper = createColumnHelper();

  const colorSchemes = [
    { text: "#6941C6", bg: "#F9F5FF", border: "#E4E7EC" },
    { text: "#175CD3", bg: "#EFF8FF", border: "#B2DDFF" },
    { text: "#3538CD", bg: "#EEF4FF", border: "#C7D7FE" },
  ];

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        id: "name",
        header: "Name",
        cell: ({
          row: {
            original: { profileImage, name, username },
          },
        }) => (
          <div className="flex items-center gap-3">
            <img
              src={profileImage}
              alt={name}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <div className="text-xs font-medium">{name}</div>
              <div className="text-xs text-gray-500">@{username}</div>
            </div>
          </div>
        ),
      }),
      columnHelper.accessor("status", {
        id: "status",
        header: "Status",
        cell: ({ getValue }) => (
          <div
            className={`flex items-center justify-center gap-2 text-xs py-1 px-2 border rounded-xl 
            ${
              getValue()
                ? "border-green-300 bg-green-50 text-green-600"
                : "border-red-300 bg-red-50 text-red-600"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                getValue() ? "bg-green-500" : "bg-red-500"
              }`}
            />
            {getValue() ? "Active" : "Inactive"}
          </div>
        ),
      }),
      columnHelper.accessor("role", {
        id: "role",
        header: "Role",
        cell: ({ getValue }) => (
          <div className="text-xs text-gray-600">{getValue()}</div>
        ),
      }),
      columnHelper.accessor("email", {
        id: "email",
        header: "Email Address",
        cell: ({ getValue }) => (
          <div className="text-xs text-gray-600">{getValue()}</div>
        ),
      }),
      columnHelper.accessor("teams", {
        id: "teams",
        header: "Teams",
        cell: ({ getValue }) => {
          const teams = getValue();
          const maxVisible = 3;
          const teamsToShow = teams.slice(0, maxVisible);
          const extraCount =
            teams.length > maxVisible ? teams.length - maxVisible : 0;

          return (
            <div className="flex flex-wrap gap-1 items-center">
              {teamsToShow.map((team, index) => {
                const { text, bg, border } =
                  colorSchemes[index % colorSchemes.length];
                return (
                  <div
                    key={index}
                    className="text-xs px-2 py-1 rounded-full"
                    style={{
                      color: text,
                      backgroundColor: bg,
                      borderColor: border,
                    }}
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
        },
      }),
    ],
    [columnHelper]
  );

  return (
    <UserTable data={data} columns={columns} roles={roles} teams={teams} />
  );
};

export default PeopleDirectory;
