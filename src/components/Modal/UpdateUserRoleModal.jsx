import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState, useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

const UpdateUserRoleModal = ({ isOpen, closeModal, role, user }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [updatedRole, setUpdatedRole] = useState(role);

  // Update local state when modal opens with new role
  useEffect(() => {
    setUpdatedRole(role);
  }, [role, isOpen]);

  const handleRoleUpdate = async () => {
    try {
      if (!user?.email) {
        toast.error("User not found!");
        return;
      }

      // PATCH request to update role
      await axiosSecure.patch("/update-role", {
        email: user.email,
        role: updatedRole,
      });

      toast.success("Role Updated Successfully!");

      // Invalidate "users" query so it refetches automatically
      queryClient.invalidateQueries(["users"]);

      closeModal();
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={closeModal}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl shadow-xl">
            <DialogTitle className="text-base/7 font-medium text-black mb-4">
              Update User Role
            </DialogTitle>

            <div className="mb-4">
              <select
                value={updatedRole}
                onChange={(e) => setUpdatedRole(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2"
              >
                <option value="user">User</option>
                <option value="librarian">Librarian</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="flex justify-between gap-4">
              <button
                onClick={handleRoleUpdate}
                type="button"
                className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
              >
                Update
              </button>

              <button
                onClick={closeModal}
                type="button"
                className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default UpdateUserRoleModal;
