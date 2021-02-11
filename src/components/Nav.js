import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';

const Nav = ({dispatch, authedUser, users, handleLogout})=> {
  const currentUser = authedUser? users[authedUser]:null;

  const logout = ()=>{
    dispatch(setAuthedUser(null));
    handleLogout();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <NavLink className="nav-link" to="/" exact>
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/add">New Question</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/leaderboard">Leader Board</NavLink>
          </li>
        </ul>
        {currentUser? (
          <>
            <span className="navbar-text">Hello, {currentUser.name}</span>
            <img className="mx-2" src={currentUser.avatarURL} width="30px" height="30px" alt="user avatar"/>
            <button className="btn btn-light" onClick={logout}>Logout</button>
          </>
        ) : null}
      </div>
    </nav>
  );
};

function mapStateToProps ({ authedUser, users }) {
  return {
    authedUser,
    users
  }
}

export default connect(mapStateToProps)(Nav);
