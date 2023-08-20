import React from "react";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import { Provider } from "./context/authContext";
import Login from "./components/Login";
import TaskList from "./components/TaskList";
import authReducer from "./reducers/authReducer";
import AddTask from "./components/AddTask";
import TaskContext from "./context/taskContext";
import taskReducer from "./reducers/taskReducer";

const initialState = {
  isAuthenticated: false,
  token: null,
  error: null,
};
const App = () => {
  const [state, dispatch] = React.useReducer(authReducer, initialState);
  const taskInitialState = React.useContext(TaskContext);
  const [Taskstate, Taskdispatch] = React.useReducer(
    taskReducer,
    taskInitialState
  );
  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch({ type: "GET_TOKEN", token: localStorage.getItem("token") });
    }
  }, []);
  const PrivateRoute = ({ isSignedIn, children }) => {
    if (!isSignedIn) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };
  return (
    <>
      <Provider value={{ state, dispatch }}>
        <TaskContext.Provider value={{ Taskstate, Taskdispatch }}>
          <Router>
            <Navbar />
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <PrivateRoute isSignedIn={state.isAuthenticated}>
                    <TaskList />
                  </PrivateRoute>
                }
              />
              <Route
                exact
                element={
                  <PrivateRoute isSignedIn={state.isAuthenticated}>
                    <TaskList />
                  </PrivateRoute>
                }
                path="/tasks"
              />
              <Route
                exact
                element={
                  <PrivateRoute isSignedIn={state.isAuthenticated}>
                    <AddTask />
                  </PrivateRoute>
                }
                path="/addTask"
              />
              <Route exact element={<Login />} path="/login" />
              <Route path="*" element={<Navigate replace to="/login" />} />
            </Routes>
          </Router>
        </TaskContext.Provider>
      </Provider>
    </>
  );
};

export default App;
