import { RECEIVE_QUESTIONS, ADD_QUESTION, ANSWER_QUESTION } from "./types";
import { saveQuestionAnswer, saveQuestion } from "../utils/api";
import { showLoading, hideLoading } from "react-redux-loading";
import { handleGetUsers } from "./users";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions: { ...questions },
  };
}

function answerQuestion({ authedUser, questionId, answer }) {
  return {
    type: ANSWER_QUESTION,
    authedUser,
    questionId,
    answer,
  };
}

export function handleAnswerQuestion({ authedUser, questionId, answer }) {
  return (dispatch) => {
    dispatch(answerQuestion({ authedUser, questionId, answer }));
    saveQuestionAnswer({ authedUser, questionId, answer })
    .then(() => dispatch(handleGetUsers()))
    .catch((e) => {
      console.warn("Error in handleAnswerQuestion: ", e);
      dispatch(answerQuestion({ authedUser, questionId, answer }));
      alert("There was an error answering the question. Try again.");
    });
  };
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question: { ...question }
  };
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    dispatch(showLoading());

    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser,
    })
      .then((question) => dispatch(addQuestion(question)))
      .then(() => dispatch(handleGetUsers()))
      .then(() => dispatch(hideLoading()));
  };
}
