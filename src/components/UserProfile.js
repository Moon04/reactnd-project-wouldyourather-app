import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { GiTrophyCup } from "react-icons/gi";
import { formatUser } from "../utils/helpers";

const UserProfile = ({ user, authedUser, order }) => {
  if (user === null) {
    return <p>This user profile doesn't exist.</p>;
  }

  return (
    <div
      className="card mx-auto w-50 user-profile my-3"
      style={{ maxWidth: 540 }}
    >
      <div className="leader-board-cup">
        <GiTrophyCup color={order === 0? "gold":order === 1? "green":"gray"}/>
      </div>
      <div className="row no-gutters">
        <div className="col-md-4">
          <img src={user.avatarURL} className="card-img" alt="user avatar" />
        </div>
        <div className="col-md-5">
          <div className="card-body">
            <h4 className="card-title text-secondary font-weight-bold mb-4">
              {authedUser === user.id ? "You" : user.name}
            </h4>
            <p className="card-text text-dark d-flex justify-content-between">
              <span>Answered questions</span>
              <span>{user.totalAnswered}</span>
            </p>
            <hr />
            <p className="card-text text-dark d-flex justify-content-between">
              <span>Created questions</span>
              <span>{user.totalCreated}</span>
            </p>
          </div>
        </div>
        <div className="col-md-3 border-left m-auto">
          <div className="card score-card ml-4">
            <div className="card-header">Score</div>
            <div className="card-body p-2 text-center">
              <h5 className="mx-auto text-white font-weight-bold">
                {user.totalScore}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps({ authedUser, users }, { userId, order }) {
  const user = users[userId];
  return {
    authedUser,
    user: formatUser(user),
  };
}

export default withRouter(connect(mapStateToProps)(UserProfile));
