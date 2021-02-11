import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const Question = ({ question, author, authedUser, history }) => {
  const handleViewPoll = () => {
    history.push(`/questions/${question.id}`);
  };

  if (question === null) {
    return <p>This Question doesn't exist.</p>;
  }

  return (
    <div className="card mb-3">
      <h5 className="card-header">
        {authedUser === author.id ? "You" : author.name} asks:
      </h5>
      <div className="row no-gutters">
        <div className="col-md-4">
          <img src={author.avatarURL} className="card-img" alt="user avatar" />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title my-4">Would you rather</h5>
            <p className="card-text py-4 my-4">__{question.optionOne.text}__</p>
            <button
              className="btn btn-outline-info w-100 position-relative"
              onClick={handleViewPoll}
            >
              View Poll
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps({ authedUser, users, questions }, { questionId }) {
  const question = questions[questionId];
  return {
    authedUser,
    author: users[question.author],
    question: question,
  };
}

export default withRouter(connect(mapStateToProps)(Question));
