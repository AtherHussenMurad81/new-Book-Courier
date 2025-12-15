import { FaUserCog } from "react-icons/fa";
import MenuItem from "./MenuItem";

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label="All User" address="all-user" />
      <MenuItem icon={FaUserCog} label="Manage Book" address="manage-book" />
      {/* <MenuItem icon={FaUserCog} label="Manage Users" address="manage-users" /> */}
    </>
  );
};

export default AdminMenu;
