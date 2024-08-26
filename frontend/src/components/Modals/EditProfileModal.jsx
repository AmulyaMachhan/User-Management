/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { addUser, editUser } from "../../redux/userSlice";
import MultiSelectDropdown from "../Table/MultiSelectDropdown";
import { useState, useEffect } from "react";
import { CloseIcon, DeleteIcon } from "../Icons";
import RefreshIcon from "../Icons/RefreshIcon";

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
  const [profileImage, setProfileImage] = useState(
    user?.profileImage ||
      "https://png.pngtree.com/png-vector/20220807/ourmid/pngtree-man-avatar-wearing-gray-suit-png-image_6102786.png"
  );

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
      setProfileImage(user.profileImage || profileImage);
    }
  }, [user, reset, profileImage]);

  useEffect(() => {
    setValue("teams", selectedTeams);
  }, [selectedTeams, setValue]);

  const onSubmit = (data) => {
    if (isAddMode) {
      dispatch(addUser({ ...data, profileImage }));
    } else {
      dispatch(editUser({ id: user.id, ...data, profileImage }));
    }
    onClose();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeletePhoto = () => {
    setProfileImage(
      "https://png.pngtree.com/png-vector/20220807/ourmid/pngtree-man-avatar-wearing-gray-suit-png-image_6102786.png"
    );
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
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-lg">
        <header className="flex justify-between items-center">
          <h2 className="text-lg font-bold">
            {isAddMode ? "Add Member" : "Edit Profile"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <CloseIcon color={"#475467"} />
          </button>
        </header>

        <div className="mb-3 flex flex-col items-center">
          <img
            src={profileImage}
            alt={user?.name || "User"}
            className="w-[80px] h-[80px] bg-cover rounded-full mb-4 border-[0.75px] border-[#334155]"
          />
          <div className="flex gap-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="profileImageUpload"
            />
            <label
              htmlFor="profileImageUpload"
              className="flex gap-2 items-center tracking-wider bg-[#F8FAFC] text-[0.7rem] text-[#06103C] font-[700] border border-[#CBD5E1] px-2 py-1.5 rounded-lg cursor-pointer"
            >
              <RefreshIcon />
              CHANGE PHOTO
            </label>
            <button
              onClick={handleDeletePhoto}
              className="flex gap-2 items-center tracking-wider bg-[#F8FAFC] text-[0.7rem] text-[#06103C] font-[700] border border-[#CBD5E1] px-2 py-1.5 rounded-lg cursor-pointer"
            >
              <DeleteIcon />
              DELETE PHOTO
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label
                className="block text-xs font-semibold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                {...register("name")}
                className="w-full border rounded-md p-2.5 border-b-1 border-b-[#475569] text-xs font-[#334155]"
                placeholder="Name"
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label
                className="block text-xs font-semibold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className="w-full border rounded-md p-2.5 border-b-1 border-b-[#475569] text-xs font-[#334155]"
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label
                className="block text-xs font-semibold mb-2"
                htmlFor="role"
              >
                Role
              </label>
              <select
                id="role"
                {...register("role")}
                className="w-full border rounded-md p-2.5 border-b-1 border-b-[#475569] text-xs font-[#334155]"
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
                <p className="text-red-500 text-xs">{errors.role.message}</p>
              )}
            </div>

            <div>
              <label
                className="block text-xs font-semibold mb-2"
                htmlFor="status"
              >
                Status
              </label>
              <select
                id="status"
                {...register("status")}
                className="w-full border rounded-md p-2.5 border-b-1 border-b-[#475569] text-xs font-[#334155]"
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
                <p className="text-red-500 text-xs">{errors.status.message}</p>
              )}
            </div>
          </div>

          <div className="">
            <label
              className="block text-xs font-semibold my-1.5"
              htmlFor="teams"
            >
              Teams
            </label>
            <MultiSelectDropdown
              options={teamsOptions}
              selectedOptions={selectedTeams}
              setSelectedOptions={setSelectedTeams}
            />
            {errors.teams && (
              <p className="text-red-500 text-xs">{errors.teams.message}</p>
            )}
          </div>

          <div
            className="mt-[2rem] flex justify-end gap-2"
            style={{ marginTop: "2rem" }}
          >
            <button
              type="button"
              onClick={onClose}
              className="bg-[#F8FAFC] text-[#06103C] font-bold text-xs tracking-wider px-3 py-1 rounded-sm border border-[#CBD5E1]"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="bg-[#F8FAFC] text-[#06103C] font-bold text-xs tracking-wider px-3 py-1 rounded-sm border border-[#CBD5E1]"
            >
              {isAddMode ? "ADD" : "SAVE"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
