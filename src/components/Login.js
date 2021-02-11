import React, { useState } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from '../actions/authedUser';

const Login = ({ dispatch, users, handleLogin }) => {
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  const login = () => {
    if (loggedInUserId) {
      const user = users[loggedInUserId];
      dispatch(setAuthedUser(user.id));
      handleLogin();
    }
  };

  return (
    <div className="w-100">
    <div className="card w-50 mx-auto my-4">
      <div className="card-body text-center">
        <h5 className="card-title">Welcome to the Would You Rather App!</h5>
        <p className="card-text">Please sign in to continue</p>
        <img src="https://media.istockphoto.com/vectors/speech-bubbles-for-solution-symbolism-vector-id1096880458?k=6&m=1096880458&s=612x612&w=0&h=LeYj8iKLQLdOCX7VWF0jZoYe_1iQj8elb_zNN9M8t74=" className="card-img-top" alt="login" />
        <div className="form-group">
          <label htmlFor="exampleFormControlSelect1">Sign In</label>
          <select
            className="form-control"
            id="exampleFormControlSelect1"
            onChange={(e) => setLoggedInUserId(e.target.value)}
          >
            <option value={0}>
                Select User
              </option>
            {Object.keys(users).map((user) => (
              <option key={users[user].id} value={users[user].id}>
                {users[user].name}
              </option>
            ))}
          </select>
        </div>
        <button className="btn btn-primary w-100" onClick={login}>Login</button>
      </div>
    </div>
    </div>
  );
};

function mapStateToProps({ users }) {
  return {
    users: { ...users },
  };
}

export default connect(mapStateToProps)(Login);
