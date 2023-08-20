import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const Navbar = () => {
  const navigate = useNavigate()
  const { state, dispatch } = React.useContext(AuthContext);
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
              onClick={() => navigate('/addTask')}
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

export default Navbar

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
