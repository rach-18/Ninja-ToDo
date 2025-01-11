import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useTask } from "../../context/TaskContext";
import { Link } from "react-router-dom";

export default function CustomizedMenus({ complete, priority, taskIndex }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const { toggleComplete, deleteTask } = useTask();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggleComplete = () => {
    console.log("Clicked");
    toggleComplete(priority, taskIndex);
    handleClose();
  };

  const handleDeleteTask = () => {
    deleteTask(priority, taskIndex);
    handleClose();
  };

  return (
    <div>
      <button
        className="hover:bg-white transition-all rounded-full p-1"
        onClick={handleClick}
      >
        <MoreVertOutlinedIcon />
      </button>

      <Menu
        id="customized-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <Link to="/early-access">
          <MenuItem sx={{ gap: 1 }} onClick={handleClose}>
            <BoltOutlinedIcon />
            Execute (Sign up for early access)
          </MenuItem>
        </Link>
        <MenuItem sx={{ gap: 1 }} onClick={handleToggleComplete}>
          <CheckCircleOutlineOutlinedIcon />
          {!complete ? "Mark as Complete" : "Mark as Incomplete"}
        </MenuItem>
        <MenuItem sx={{ gap: 1 }} onClick={handleClose}>
          <EditOutlinedIcon />
          Edit
        </MenuItem>
        <MenuItem sx={{ gap: 1, color: "#E76460" }} onClick={handleDeleteTask}>
          <DeleteOutlinedIcon />
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
}
