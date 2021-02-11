import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Question from "./Question";

const Home = ({
  unAnsweredQuestionsIds,
  answeredQuestionsIds,
}) => {
  const [activeStatus, setActiveStatus] = useState(1);
  const [questionsIdsList, setQuestionsIdsList] = useState([]);

  useEffect(() => {
    console.log("blaaa");
    setQuestionsIdsList([...unAnsweredQuestionsIds]);
  }, [unAnsweredQuestionsIds]);

  const showQuestionsByStatus = (status) => {
    if (status === 1) {
      setQuestionsIdsList([...unAnsweredQuestionsIds]);
    } else if (status === 2) {
      setQuestionsIdsList([...answeredQuestionsIds]);
    }
    setActiveStatus(status);
  };

  return (
    <div className="card w-50 mx-auto my-4">
      <div className="card-header p-0">
        <button
          className={`btn font-weight-bold p-3 w-50 ${
            activeStatus === 1 ? "text-info" : "bg-white"
          }`}
          onClick={() => showQuestionsByStatus(1)}
        >
          Unanswered Questions
        </button>
        <button
          className={`btn font-weight-bold p-3 w-50 ${
            activeStatus === 2 ? "text-info" : "bg-white"
          }`}
          onClick={() => showQuestionsByStatus(2)}
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
};

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
