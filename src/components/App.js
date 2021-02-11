import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import LoadingBar from "react-redux-loading";

import Nav from "./Nav";
import Login from "./Login";
import Home from "./Home";
import LeaderBoard from "./LeaderBoard";
import QuestionPage from "./QuestionPage";
import NewQuestion from "./NewQuestion";
import { handleInitialData } from "../actions/shared";

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleInitialData());
  }

  handleLogin = () => {
    this.props.history.push("/");
  };

  handleLogout = () => {
    this.props.history.push("/");
  };

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="app-container">
            <Nav handleLogout={this.handleLogout} />
            {this.props.authedUser === null ? (
              <Login handleLogin={this.handleLogin} />
            ) : (
              <>
                <Route path="/" exact component={Home} />
                <Route path="/questions/:id" component={QuestionPage} />
                <Route path="/add" component={NewQuestion} />
                <Route path="/leaderboard" component={LeaderBoard} />
              </>
            )}
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default withRouter(connect(mapStateToProps)(App));
