import React from "react";
import { connect } from "react-redux";
import UserProfile from "./UserProfile";

const LeaderBoard = ({ usersIds }) => {
  return (
    <div className="leader-board-container">
      {usersIds.map((userId, index) => (
        <UserProfile key={userId} order={index} userId={userId} />
      ))}
    </div>
  );
};

function mapStateToProps({ users }) {
  const totalQuestions = (userId) => {
    const user = users[userId];
    const asked = user.questions.length;
    const answered = Object.keys(user.answers).length;
    return asked + answered;
  };

  const usersIds = Object.keys(users).sort(
    (a, b) => totalQuestions(b) - totalQuestions(a)
  );

  return {
    usersIds: usersIds.splice(0, 3),
  };
}

export default connect(mapStateToProps)(LeaderBoard);
