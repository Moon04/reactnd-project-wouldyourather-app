import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { handleAnswerQuestion } from "../actions/questions";

class QuestionPage extends Component {
  state = {
    checkedOption: "",
  };

  handleAnswer = (e) => {
    e.preventDefault();
    const answer = e.target.questionOption.value;
    const { question, authedUser, dispatch } = this.props;
    dispatch(handleAnswerQuestion({ authedUser, questionId: question.id, answer }));
  };

  render() {
    const { question, author, authedUser, answer, totalVotes } = this.props;

    return (
      <div className="card w-50 mx-auto my-4">
        <h5 className="card-header">
          {answer
            ? `Asked by ${author.id === authedUser ? "you" : author.name}`
            : `${author.id === authedUser ? "you" : author.name} asks:`}
        </h5>
        <div className="row no-gutters">
          <div className="col-md-4">
            <img
              src={author.avatarURL}
              className="card-img position-relative"
              style={{top: answer? "85px":"0"}}
              alt="user avatar"
            />
          </div>
          <div className="col-md-8">
            {answer ? (
              <div className="card-body">
                <h3 className="card-title">Results:</h3>
                <div className="d-flex justify-content-end">
                  <span
                    className="custom-badge position-absolute text-white badge-warning"
                    style={{ top: answer === "optionOne" ? "55px" : "260px" }}
                  >
                    Your Vote
                  </span>
                </div>

                <div
                  className={`card mb-4 ${
                    answer === "optionOne" ? "answered" : ""
                  }`}
                >
                  <div className="card-body">
                    <h5 className="card-title mb-4">
                      Would you rather {question.optionOne.text}?
                    </h5>

                    <div className="progress" style={{ height: "40px" }}>
                      <div
                        className="progress-bar font-weight-bold bg-info"
                        role="progressbar"
                        style={{
                          width: `${
                            (question.optionOne.votes.length / totalVotes) * 100
                          }%`,
                        }}
                        aria-valuenow={50}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        {`${
                          (question.optionOne.votes.length / totalVotes) * 100
                        }%`}
                      </div>
                    </div>
                    <h6 className="card-subtitle text-secondary font-weight-bold my-2 text-center">
                      {question.optionOne.votes.length +
                        " out of " +
                        totalVotes}
                    </h6>
                  </div>
                </div>
                <div
                  className={`card mt-4 ${
                    answer === "optionTwo" ? "answered" : ""
                  }`}
                >
                  <div className="card-body">
                    <h5 className="card-title mb-4">
                      Would you rather {question.optionTwo.text}?
                    </h5>

                    <div className="progress" style={{ height: "40px" }}>
                      <div
                        className="progress-bar font-weight-bold bg-info"
                        role="progressbar"
                        style={{
                          width: `${
                            (question.optionTwo.votes.length / totalVotes) * 100
                          }%`,
                        }}
                        aria-valuenow={50}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        {`${
                          (question.optionTwo.votes.length / totalVotes) * 100
                        }%`}
                      </div>
                    </div>
                    <h6 className="card-subtitle text-secondary font-weight-bold my-2 text-center">
                      {question.optionTwo.votes.length +
                        " out of " +
                        totalVotes}
                    </h6>
                  </div>
                </div>
              </div>
            ) : (
              <form className="card-body" onSubmit={this.handleAnswer}>
                <h3 className="card-title font-weight-bold mb-3">
                  Would You Rather ...
                </h3>
                <div className="py-2">
                  <div className="form-check my-2">
                    <input
                      value="optionOne"
                      className="form-check-input"
                      type="radio"
                      name="questionOption"
                      id="optionOne"
                      defaultChecked
                      onChange={(e) =>
                        this.setState(() => ({
                          checkedOption: e.target.value,
                        }))
                      }
                    />
                    <label
                      className="form-check-label text-secondary font-weight-bold"
                      htmlFor="optionOne"
                    >
                      {question.optionOne.text}
                    </label>
                  </div>
                  <div className="form-check my-2">
                    <input
                      value="optionTwo"
                      className="form-check-input"
                      type="radio"
                      name="questionOption"
                      id="optionTwo"
                      onChange={(e) =>
                        this.setState(() => ({
                          checkedOption: e.target.value,
                        }))
                      }
                    />
                    <label
                      className="form-check-label text-secondary font-weight-bold"
                      htmlFor="optionTwo"
                    >
                      {question.optionTwo.text}
                    </label>
                  </div>
                </div>

                <button
                  className="btn position-relative btn-info w-100"
                  style={{ top: "45px" }}
                >
                  Submit
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }, props) {
  const { id } = props.match.params;
  const question = questions[id];

  return {
    authedUser,
    author: users[question.author],
    question: question,
    totalVotes:
      question.optionOne.votes.length + question.optionTwo.votes.length,
    answer: question.optionOne.votes.includes(authedUser)
      ? "optionOne"
      : question.optionTwo.votes.includes(authedUser)
      ? "optionTwo"
      : "",
  };
}

export default withRouter(connect(mapStateToProps)(QuestionPage));
