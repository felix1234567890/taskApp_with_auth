import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Provider } from './context/authContext';
import Login from './components/Login';
import TaskList from './components/TaskList';
import authReducer from './reducers/authReducer';
import AddTask from './components/AddTask';
import TaskContext from './context/taskContext';
import taskReducer from './reducers/taskReducer';

const initialState = {
  isAuthenticated: false,
  token: null,
  error: null
};
const App = () => {
  const [state, dispatch] = React.useReducer(authReducer, initialState);
  const taskInitialState = React.useContext(TaskContext);
  const [Taskstate, Taskdispatch] = React.useReducer(
    taskReducer,
    taskInitialState
  );
  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch({ type: 'GET_TOKEN', token: localStorage.getItem('token') });
    }
  }, []);
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        state.isAuthenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
  return (
    <>
      <Provider value={{ state, dispatch }}>
        <TaskContext.Provider value={{ Taskstate, Taskdispatch }}>
          <Router>
            <Navbar />
            <PrivateRoute exact component={TaskList} path="/tasks" />
            <PrivateRoute exact component={AddTask} path="/addTask" />
            {!state.isAuthenticated ? (
              <Route exact component={Login} path="/login" />
            ) : (
              <Redirect to="/tasks" />
            )}

            <Route path="*" render={() => <Redirect to="/login" />} />
          </Router>
        </TaskContext.Provider>
      </Provider>
    </>
  );
};

export default App;
