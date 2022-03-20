import { Container, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTaskAsync,
  deleteProjectAsync,
  editProjectAsync,
  findProjectsAsync,
} from "../../store/todo";
import Input from "../Input";
import TaskList from "../TaskList";
import Edit from "../Edit";

export default function Project() {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.todo.projects);

  useEffect(() => {
    const fetchData = () => {
      dispatch(findProjectsAsync());
    };
    fetchData();
  }, [dispatch]);

  const addTask = (projectId) => (newTask) => {
    if (newTask === "") return;
    dispatch(createTaskAsync(projectId, newTask));
  };

  const handleDelete = (project) => {
    if (project.done) return;
    dispatch(deleteProjectAsync(project.id));
  };
  const handleEdit = (project) => (newName) => {
    if (!newName) return;
    dispatch(editProjectAsync(project.id, newName));
  };

  if (projects) {
    return (
      <Container
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-start",
          justifyContent: "space-around",
        }}
        noValidate
        autoComplete="off"
      >
        {projects.map((project) => (
          <div
            key={project.id}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              border: "1px dashed grey",
              width: "500px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <h1>{project.projectName}</h1>
              <div style={{ display: "flex" }}>
                <Edit action={handleEdit(project)} />
                <IconButton onClick={() => handleDelete(project)}>
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
            {project.tasks?.length > 0 && <TaskList tasks={project.tasks} />}
            <Input action={addTask(project.id)} label="Task" text="Add Task" />
          </div>
        ))}
      </Container>
    );
  }
  return <div className="container"></div>;
}
