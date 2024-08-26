import { useMemo } from "react";
import { useSelector } from "react-redux";
import { createColumnHelper } from "@tanstack/react-table";
import UserTable from "./Table/UserTable";
import Name from "./Columns/Name";
import Status from "./Columns/Status";
import Teams from "./Columns/Teams";
import { DownArrowIcon, QuestionIcon } from "./Icons";

const PeopleDirectory = () => {
  const users = useSelector((state) => state.user.users);

  const data = useMemo(() => users, [users]);
  const columnHelper = createColumnHelper();

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        id: "name",
        header: () => (
          <div className="flex gap-4 items-center">
            <span>Name</span>
            <DownArrowIcon />
          </div>
        ),
        cell: ({
          row: {
            original: { profileImage, name, username },
          },
        }) => (
          <Name profileImage={profileImage} name={name} username={username} />
        ),
      }),
      columnHelper.accessor("status", {
        id: "status",
        header: () => (
          <div className="flex gap-2 items-center">
            <span>Status</span>
            <DownArrowIcon />
          </div>
        ),
        cell: ({ getValue }) => <Status isActive={getValue()} />,
      }),

      columnHelper.accessor("role", {
        id: "role",
        header: () => (
          <div className="flex gap-2 items-center">
            <span>Role</span>
            <QuestionIcon />
          </div>
        ),
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
          return <Teams teams={getValue()} />;
        },
      }),
    ],
    [columnHelper]
  );

  return <UserTable data={data} columns={columns} overlapFromColumn="status" />;
};

export default PeopleDirectory;
