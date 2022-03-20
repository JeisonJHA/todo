import { Container } from "@mui/material";

import Task from "../Task";

export default function TaskList({ tasks }) {
  if (tasks) {
    return (
      <Container noValidate autoComplete="off">
        {tasks?.length > 0 && (
          <div style={{ width: "100%" }}>
            <div>
              <h1>To Do</h1>
              {tasks
                .filter((task) => !task.done)
                .map((task) => (
                  <Task task={task} />
                ))}
            </div>
            <div>
              <h1>Done</h1>
              {tasks
                .filter((task) => task.done)
                .map((task) => (
                  <Task task={task} />
                ))}
            </div>
          </div>
        )}
      </Container>
    );
  }
  return <div className="container"></div>;
}
