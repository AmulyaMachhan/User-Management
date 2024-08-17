/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { addUser, editUser } from "../../redux/userSlice";
import MultiSelectDropdown from "../Table/MultiSelectDropdown";
import { useState, useEffect } from "react";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  role: z.string().min(1, "Role is required"),
  status: z.string().min(1, "Status is required"),
  teams: z.array(z.string()).min(1, "At least one team is required"),
});

const EditProfileModal = ({ user, onClose }) => {
  const isAddMode = !user;
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      role: "",
      status: "",
      teams: [],
    },
  });

  const [selectedTeams, setSelectedTeams] = useState([]);

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "",
        status: user.status || "",
        teams: user.teams || [],
      });
      setSelectedTeams(user.teams || []);
    }
  }, [user, reset]);

  useEffect(() => {
    setValue("teams", selectedTeams);
  }, [selectedTeams, setValue]);

  const onSubmit = (data) => {
    if (isAddMode) {
      dispatch(addUser(data));
    } else {
      dispatch(editUser({ id: user.id, ...data }));
    }
    onClose();
  };

  const roleOptions = [
    "Product Designer",
    "Product Developer",
    "Frontend Engineer",
    "Backend Engineer",
  ];
  const statusOptions = ["Active", "Inactive"];
  const teamsOptions = ["Development", "Design", "Marketing", "Support"];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-2/3 max-w-lg">
        <header className="flex justify-between items-center pb-2 mb-4">
          <h2 className="text-lg font-semibold">
            {isAddMode ? "Add New Member" : "Edit Profile"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              width="24"
              height="24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 18L18 6M6 6l12 12"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </header>

        <div className="mb-4 flex flex-col items-center">
          <img
            src={
              user?.profileImage ||
              "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
            }
            alt={user?.name || "User"}
            className="w-[80px] h-[80px] rounded-full mb-4"
          />
          <div className="flex space-x-2">
            <button className="flex items-center gap-2 bg-[#F8FAFC] text-[#06103C] font-[700] tracking-wide px-3 py-1.5 rounded-lg">
              CHANGE PHOTO
            </button>
            <button className="flex items-center gap-2 bg-[#F8FAFC] text-[#06103C] font-[700] tracking-wide px-3 py-1.5 rounded-lg">
              DELETE PHOTO
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block mb-1" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                {...register("name")}
                className="w-full border rounded-md p-2"
                placeholder="Name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-1" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className="w-full border rounded-md p-2"
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block mb-1" htmlFor="role">
                Role
              </label>
              <select
                id="role"
                {...register("role")}
                className="w-full border rounded-md p-2"
              >
                <option value="" disabled>
                  Select Role
                </option>
                {roleOptions.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              {errors.role && (
                <p className="text-red-500 text-sm">{errors.role.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-1" htmlFor="status">
                Status
              </label>
              <select
                id="status"
                {...register("status")}
                className="w-full border rounded-md p-2"
              >
                <option value="" disabled>
                  Select Status
                </option>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              {errors.status && (
                <p className="text-red-500 text-sm">{errors.status.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block mb-1" htmlFor="teams">
              Teams
            </label>
            <MultiSelectDropdown
              options={teamsOptions}
              selectedOptions={selectedTeams}
              setSelectedOptions={setSelectedTeams}
            />
            {errors.teams && (
              <p className="text-red-500 text-sm">{errors.teams.message}</p>
            )}
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              {isAddMode ? "Add Member" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
