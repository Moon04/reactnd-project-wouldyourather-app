import { getUsers } from "../utils/api";
import { RECEIVE_USERS } from "./types";

export function receiveUsers (users) {
  return {
    type: RECEIVE_USERS,
    users: { ...users },
  };
}

export function handleGetUsers () {
  return (dispatch) => {
    return getUsers()
      .then((users) => dispatch(receiveUsers(users)));
  }
}