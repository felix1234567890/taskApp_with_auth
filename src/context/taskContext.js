import React from 'react';

const TaskContext = React.createContext({
  currentTask: null,
  tasks: [
    { id: 1, title: 'Do something', completed: false },
    { id: 2, title: 'Do something else', completed: true }
  ]
});
export default TaskContext;
