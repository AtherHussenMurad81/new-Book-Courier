import { BsFillHouseAddFill } from "react-icons/bs";
import { MdHomeWork, MdOutlineManageHistory } from "react-icons/md";
import MenuItem from "./MenuItem";
const Librarian = () => {
  return (
    <>
      <MenuItem icon={BsFillHouseAddFill} label="Add Book" address="add-book" />
      <MenuItem icon={MdHomeWork} label="My book" address="my-book" />
      {/* <MenuItem
        icon={MdOutlineManageHistory}
        label="Manage Orders"
        address="manage-orders"
      /> */}
    </>
  );
};

export default Librarian;
