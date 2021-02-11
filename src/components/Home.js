import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "./Question";

class Home extends Component {
  state = {
    activeStatus: 1,
    questionsIdsList: [],
  };

  componentDidMount() {
    const { unAnsweredQuestionsIds } = this.props;
    this.setState(() => ({
      questionsIdsList: [...unAnsweredQuestionsIds],
    }));
  }

  showQuestionsByStatus = (status) => {
    const { unAnsweredQuestionsIds, answeredQuestionsIds } = this.props;
    if (status === 1) {
      this.setState(() => ({
        questionsIdsList: [...unAnsweredQuestionsIds],
        activeStatus: status,
      }));
    } else if (status === 2) {
      this.setState(() => ({
        questionsIdsList: [...answeredQuestionsIds],
        activeStatus: status,
      }));
    }
  };

  render() {
    const { questionsIdsList, activeStatus } = this.state;
    return (
      <div className="card w-50 mx-auto my-4">
        <div className="card-header p-0">
          <button
            className={`btn font-weight-bold p-3 w-50 ${
              activeStatus === 1 ? "text-info" : "bg-white"
            }`}
            onClick={() => this.showQuestionsByStatus(1)}
          >
            Unanswered Questions
          </button>
          <button
            className={`btn font-weight-bold p-3 w-50 ${
              activeStatus === 2 ? "text-info" : "bg-white"
            }`}
            onClick={() => this.showQuestionsByStatus(2)}
          >
            Answered Questions
          </button>
        </div>
        <div className="card-body">
          {questionsIdsList?.map((questionId) => (
            <Question key={questionId} questionId={questionId} />
          ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ questions, authedUser }) {
  return {
    answeredQuestionsIds: Object.keys(questions)
      .filter(
        (q) =>
          questions[q].optionOne.votes.includes(authedUser) ||
          questions[q].optionTwo.votes.includes(authedUser)
      )
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
    unAnsweredQuestionsIds: Object.keys(questions)
      .filter(
        (q) =>
          !questions[q].optionOne.votes.includes(authedUser) &&
          !questions[q].optionTwo.votes.includes(authedUser)
      )
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
  };
}

export default connect(mapStateToProps)(Home);
