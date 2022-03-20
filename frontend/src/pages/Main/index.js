import { useDispatch } from "react-redux";

import Project from "../../components/Project";
import Input from "../../components/Input";
import { createProjectsAsync } from "../../store/todo";

export default function Main() {
  const dispatch = useDispatch();

  const createProjects = (newProject) => {
    if (newProject === "") return;
    dispatch(createProjectsAsync(newProject));
  };

  return (
    <div className="container">
      <Input action={createProjects} label="Project" text="Add Project" />
      <Project />
    </div>
  );
}
