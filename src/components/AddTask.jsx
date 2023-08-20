import React from 'react';
import { useNavigate } from 'react-router-dom';
import TaskContext from '../context/taskContext';

const AddTask = () => {
  const navigate = useNavigate()
  const { Taskstate, Taskdispatch } = React.useContext(TaskContext);
  const titleRef = React.useRef();

  const [task, setTask] = React.useState({
    title: Taskstate.currentTask ? Taskstate.currentTask.title : '',
    completed: Taskstate.currentTask ? Taskstate.currentTask.completed : false
  });

  const handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setTask({
      ...task,
      [name]: value
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (task.title.trim().length === 0 || task.title.trim().length < 10)
      alert('Zadatak mora imati više od 10 slova');
    if (Taskstate.currentTask) {
      Taskdispatch({ type: 'UPDATE_TASK', payload: task });
    } else {
      Taskdispatch({ type: 'ADD_TASK', payload: task });
    }
    setTask({
      title: '',
      completed: false
    });
    navigate('/tasks');
  };
  React.useEffect(() => titleRef.current.focus(), []);
  return (
    <form style={form} onSubmit={event => handleSubmit(event)}>
      <div className="form-group">
        <label htmlFor="task">Naziv zadatka</label>
        <input
          ref={titleRef}
          id="task"
          type="text"
          name="title"
          className={`form-control`}
          placeholder="Unesi zadatak"
          value={task.title}
          onChange={handleInputChange}
        />
      </div>
      {Taskstate.currentTask && (
        <div className="form-check">
          <input
            name="completed"
            type="checkbox"
            className="form-check-input"
            checked={task.completed}
            onChange={handleInputChange}
          />
          <label className="form-check-label">Završeno ? </label>
        </div>
      )}

      <button type="submit" className="btn btn-primary">
        Dodaj
      </button>
      <button
        className="btn btn-danger mx-2"
        onClick={() => navigate('/tasks')}
      >
        Poništi
      </button>
    </form>
  );
};

export default AddTask;
const form = {
  margin: '15px auto',
  width: '50%'
};
