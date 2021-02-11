import {
  _getUsers,
  _getQuestions,
  _saveQuestionAnswer,
  _saveQuestion,
} from "./_DATA.js";

export function getInitialData() {
  return Promise.all([_getUsers(), _getQuestions()]).then(
    ([users, questions]) => ({
      users,
      questions,
    })
  );
}

export function getUsers() {
  return _getUsers();
}

export function saveQuestionAnswer(answer) {
  return _saveQuestionAnswer(answer);
}

export function saveQuestion(question) {
  return _saveQuestion(question);
}
