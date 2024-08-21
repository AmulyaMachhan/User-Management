import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { createColumnHelper } from "@tanstack/react-table";
import UserTable from "./Table/UserTable";
import Name from "./Columns/Name";
import Status from "./Columns/Status";
import Teams from "./Columns/Teams";
import { DownArrowIcon, DownIcon, QuestionIcon, UpIcon } from "./Icons";

const PeopleDirectory = () => {
  const users = useSelector((state) => state.user.users);
  const [isSidePaneOpen, setIsSidePaneOpen] = useState(false);

  const data = useMemo(() => users, [users]);
  const columnHelper = createColumnHelper();

  // Define columns including the checkbox column
  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        id: "name",
        header: ({ column }) => (
          <div
            className="flex gap-4 items-center cursor-pointer"
            onClick={column.getToggleSortingHandler()}
          >
            {isSidePaneOpen && <input type="checkbox" className="" />}
            <span>Name</span>
            <div className="flex flex-col gap-1">
              {isSidePaneOpen ? (
                <>
                  <UpIcon />
                  <DownIcon />
                </>
              ) : (
                <DownArrowIcon />
              )}
            </div>
          </div>
        ),
        cell: ({
          row: {
            original: { profileImage, name, username },
            getIsSelected,
          },
        }) => (
          <Name
            profileImage={profileImage}
            name={name}
            username={username}
            getIsSelected={getIsSelected}
            isSidePaneOpen={isSidePaneOpen}
          />
        ),
        sortingFn: "alphanumeric",
        enableSorting: true,
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
        className: `transition-all duration-300 ease-in-out ${
          isSidePaneOpen ? "w-1/4" : "w-full"
        }`, // Smooth transition class
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
        className: `transition-all duration-300 ease-in-out ${
          isSidePaneOpen ? "hidden" : "block"
        }`, // Smooth transition class for hiding the column
      }),
      columnHelper.accessor("email", {
        id: "email",
        header: "Email Address",
        cell: ({ getValue }) => (
          <div className="text-[0.7rem] text-gray-600">{getValue()}</div>
        ),
        className: `transition-all duration-300 ease-in-out ${
          isSidePaneOpen ? "hidden" : "block"
        }`, // Smooth transition class for hiding the column
      }),
      columnHelper.accessor("teams", {
        id: "teams",
        header: "Teams",
        cell: ({ getValue }) => {
          return <Teams teams={getValue()} />;
        },
        className: `transition-all duration-300 ease-in-out ${
          isSidePaneOpen ? "hidden" : "block"
        }`,
      }),
    ],
    [columnHelper, isSidePaneOpen]
  );

  return (
    <UserTable
      data={data}
      columns={columns}
      onSidePaneToggle={setIsSidePaneOpen}
    />
  );
};

export default PeopleDirectory;
