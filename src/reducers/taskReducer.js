const generateId = () => {
  return (
    '_' +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};
export default (state, action) => {
  switch (action.type) {
    case 'SET_CURRENT':
      return {
        ...state,
        currentTask: action.payload
      };
    case 'ADD_TASK':
      const newTask = {
        id: generateId(),
        title: action.payload.title,
        completed: action.payload.completed
      };
      return {
        ...state,
        tasks: state.tasks.concat(newTask)
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.id)
      };
    case 'UPDATE_TASK':
      const updatedTasks = [...state.tasks];
      const taskIndex = state.tasks.findIndex(
        task => task.id === state.currentTask.id
      );
      updatedTasks[taskIndex].title = action.payload.title;
      updatedTasks[taskIndex].completed = action.payload.completed;
      return {
        currentTask: null,
        tasks: updatedTasks
      };
    default:
      return state;
  }
};
