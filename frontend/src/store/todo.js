import { createSlice } from '@reduxjs/toolkit';
import api from '../services/api';

export const todo = createSlice({
  name: 'todo',
  initialState: {
    projects: [{}],
  },
  reducers: {
    findProjects(state, action) {
      state.projects = action.payload
    },
    createProject(state, action) {
      state.projects.push(action.payload)
    },
    createTask(state, action) {
      const { projectId, task } = action.payload;
      const project = state.projects.find(project => project.id === projectId)
      project.tasks.push(task);
    },
    deleteTask(state, action) {
      const { projectId, taskId } = action.payload;
      const project = state.projects.find(project => project.id === projectId)
      const tasks = project.tasks.filter(task => task.id !== taskId);
      project.tasks = tasks;
    },
    editTask(state, action) {
      const { projectId, taskId, taskName } = action.payload;
      const project = state.projects.find(project => project.id === projectId)
      const task = project.tasks.find(task => task.id === taskId);
      task.taskName = taskName;
    },
    deleteProject(state, action) {
      const { projectId } = action.payload;
      const projects = state.projects.filter(project => project.id !== projectId)
      state.projects = projects
    },
    editProject(state, action) {
      const { projectId, projectName } = action.payload;
      const project = state.projects.find(project => project.id === projectId)
      project.projectName = projectName;
    },
    finishTask(state, action) {
      const { projectId, taskId, taskFinished } = action.payload;
      const project = state.projects.find(project => project.id === projectId)
      const task = project.tasks.find(task => task.id === taskId);
      task.finishDate = taskFinished.finishDate;
      task.done = true;
    }
  }
})

export const { findProjects, createProject, createTask, finishTask, deleteTask, editTask,
  deleteProject, editProject } = todo.actions;

export default todo.reducer;

export function findProjectsAsync() {
  return async function (dispatch) {
    try {
      const response = await api.get('/projects');
      dispatch(findProjects(response.data.projects))
    } catch (error) {
      alert(error.response.data.message);
    }
  }
}

export function createProjectsAsync(projectName) {
  return async function (dispatch) {
    try {
      const response = await api.post('/projects', { projectName });
      dispatch(createProject(response.data.project))
    } catch (error) {
      alert(error.response.data.message);
    }
  }
}

export function createTaskAsync(projectId, taskName) {
  return async function (dispatch) {
    try {
      const response = await api.post(`/projects/${projectId}/tasks`, { taskName });
      dispatch(createTask({ projectId, task: response.data.task }))
    } catch (error) {
      alert(error.response.data.message);
    }
  }
}

export function finishTaskAsync(projectId, taskId) {
  return async function (dispatch) {
    try {
      const response = await api.put(`/projects/${projectId}/tasks/${taskId}/finish`);
      dispatch(finishTask({ projectId, taskId, taskFinished: response.data }))
    } catch (error) {
      alert(error.response.data.message);
    }
  }
}

export function deleteTaskAsync(projectId, taskId) {
  return async function (dispatch) {
    try {
      await api.delete(`/projects/${projectId}/tasks/${taskId}`);
      dispatch(deleteTask({ projectId, taskId }))
    } catch (error) {
      alert(error.response.data.message);
    }
  }
}

export function editTaskAsync(projectId, taskId, taskName) {
  return async function (dispatch) {
    try {
      await api.put(`/projects/${projectId}/tasks/${taskId}`, { taskName });
      dispatch(editTask({ projectId, taskId, taskName }))
    } catch (error) {
      alert(error.response.data.message);
    }
  }
}

export function deleteProjectAsync(projectId) {
  return async function (dispatch) {
    try {
      await api.delete(`/projects/${projectId}`);
      dispatch(deleteProject({ projectId }))
    } catch (error) {
      alert(error.response.data.message);
    }
  }
}

export function editProjectAsync(projectId, projectName) {
  return async function (dispatch) {
    try {
      await api.put(`/projects/${projectId}`, { projectName });
      dispatch(editProject({ projectId, projectName }))
    } catch (error) {
      alert(error.response.data.message);
    }
  }
}
