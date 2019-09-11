import React from 'react';
import { AuthContext } from '../context/authContext';
import { withRouter } from 'react-router-dom';

const Navbar = ({ history }) => {
  const { state, dispatch } = React.useContext(AuthContext);
  console.log(state);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="#">
        <i className="fas fa-th list" style={iconStyle}></i>
        <h2 style={navTitle}>Upravitelj zadacima</h2>
      </a>
      {state.isAuthenticated && (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a
              className="nav-link"
              href="#"
              onClick={() => history.push('/addTask')}
            >
              DODAJ ZADATAK
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="#"
              onClick={() => dispatch({ type: 'LOGOUT' })}
            >
              LOGOUT
            </a>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default withRouter(Navbar);

const iconStyle = {
  borderRadius: '50%',
  border: '1px solid white',
  padding: '5px',
  color: 'teal',
  marginRight: '10px'
};
const navTitle = {
  fontFamily: 'Modak, cursive',
  display: 'inline-block',
  color: 'white',
  margin: '0',
  letterSpacing: '5px'
};
