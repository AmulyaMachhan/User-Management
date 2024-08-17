import { useMemo } from "react";
import UserTable from "./Table/UserTable";
import { createColumnHelper } from "@tanstack/react-table";
import { useSelector } from "react-redux";

const PeopleDirectory = () => {
  const users = useSelector((state) => state.user.users);
  const roles = useSelector((state) => state.role.roles);
  const teams = useSelector((state) => state.team.teams);

  // Memoize the data to optimize performance
  const data = useMemo(() => users, [users]);

  // Create column helper
  const columnHelper = createColumnHelper();

  const colorSchemes = [
    { text: "#6941C6", bg: "#F9F5FF", border: "#E4E7EC" },
    { text: "#175CD3", bg: "#EFF8FF", border: "#B2DDFF" },
    { text: "#3538CD", bg: "#EEF4FF", border: "#C7D7FE" },
    // Add more color schemes as needed
  ];

  // Define columns
  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        id: "name",
        header: "Name",
        cell: (info) => (
          <div className="flex items-center gap-4">
            <img
              src={info.row.original.profileImage}
              alt={info.row.original.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <div className="font-[500]">{info.row.original.name}</div>
              <div className="text-sm font-[500]">
                <span className="text-[#475467]">
                  @{info.row.original.username}
                </span>
              </div>
            </div>
          </div>
        ),
      }),
      columnHelper.accessor("status", {
        id: "status",
        header: "Status",
        cell: (info) => (
          <div className="flex items-center justify-center text-sm gap-1 py-1 border border-[#D0D5DD] rounded-xl">
            <span
              className={`h-2 w-2 rounded-full ${
                info.getValue() ? "bg-green-500" : "bg-red-500"
              }`}
            ></span>
            {info.getValue() ? "Active" : "Inactive"}
          </div>
        ),
      }),
      columnHelper.accessor("role", {
        id: "role",
        header: "Role",
        cell: (info) => (
          <div className="text-sm text-[#475467]">{info.getValue()}</div>
        ),
      }),
      columnHelper.accessor("email", {
        id: "email",
        header: "Email Address",
        cell: (info) => (
          <div className="text-sm text-[#475467]">{info.getValue()}</div>
        ),
      }),
      columnHelper.accessor("teams", {
        id: "teams",
        header: "Teams",
        cell: (info) => {
          const teams = info.getValue();
          return (
            <div className="flex flex-wrap gap-2">
              {Array.isArray(teams)
                ? teams.map((team, index) => {
                    // Use modulo to cycle through color schemes
                    const scheme = colorSchemes[index % colorSchemes.length];
                    return (
                      <div
                        key={index}
                        className="text-xs px-2 py-1 gap-2 font-[600] rounded-3xl"
                        style={{
                          color: scheme.text,
                          backgroundColor: scheme.bg,
                          borderColor: scheme.border,
                          borderWidth: "1px",
                          borderStyle: "solid",
                        }}
                      >
                        <span>{team}</span>
                      </div>
                    );
                  })
                : null}
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
