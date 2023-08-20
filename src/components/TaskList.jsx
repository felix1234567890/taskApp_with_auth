import React from 'react';
import TaskContext from '../context/taskContext';
import TaskItem from './TaskItem';

const TaskList = ({ history }) => {
  const { Taskstate } = React.useContext(TaskContext);
  return (
    <div>
      {Taskstate.tasks.map(task => (
        <TaskItem task={task} key={task.id} history={history} />
      ))}
    </div>
  );
};
export default TaskList;
