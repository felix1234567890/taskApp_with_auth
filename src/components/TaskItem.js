import React from 'react';
import TaskContext from '../context/taskContext';

const TaskItem = ({ task, history }) => {
  const { Taskdispatch } = React.useContext(TaskContext);
  return (
    <div className="card border-dark w-50 mx-auto my-3">
      <div className="card-body">
        <h5 className="card-title" style={task.completed ? title : null}>
          {task.title}
        </h5>
        <p className="card-text">
          {task.completed && (
            <span>
              <i className="fa fa-check-circle mr-1"></i>Završeno
            </span>
          )}
        </p>
        {!task.completed && (
          <button
            type="button"
            className="btn btn-success"
            onClick={() => {
              Taskdispatch({ type: 'SET_CURRENT', payload: task });
              history.push('/addTask');
            }}
          >
            Izmijeni
          </button>
        )}

        <button
          type="button"
          className="btn btn-danger mx-1"
          onClick={() => Taskdispatch({ type: 'DELETE_TASK', id: task.id })}
        >
          Izbriši
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
const title = {
  textDecoration: 'line-through'
};
