import { Checkbox, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import {
  deleteTaskAsync,
  finishTaskAsync,
  editTaskAsync,
} from "../../store/todo";

import Edit from "../Edit";

export default function Task({ task }) {
  const dispatch = useDispatch();
  const handleDone = (task) => {
    if (task.done) return;
    dispatch(finishTaskAsync(task.projectId, task.id));
  };

  const handleDelete = (task) => {
    if (task.done) return;
    dispatch(deleteTaskAsync(task.projectId, task.id));
  };
  const handleEdit = (task) => (newName) => {
    if (!newName) return;
    dispatch(editTaskAsync(task.projectId, task.id, newName));
  };

  return (
    <div
      key={task.id}
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", }}>
        <Checkbox
          checked={task.done}
          onChange={() => handleDone(task)}
          inputProps={{ "aria-label": "controlled" }}
        />
        <Tooltip disableHoverListener={!task.done} title={new Date(task.finishDate).toLocaleString()}>
          <h2>{task.taskName}</h2>
        </Tooltip>
      </div>
      {!task.done && (
        <div style={{ display: "flex" }}>
          <Edit action={handleEdit(task)} />
          <IconButton onClick={() => handleDelete(task)}>
            <DeleteIcon />
          </IconButton>
        </div>
      )}
    </div>
  );
}
