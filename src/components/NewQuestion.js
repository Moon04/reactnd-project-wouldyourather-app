import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/questions";

class NewQuestion extends Component {
  state = {
    optionOneText: "",
    optionTwoText: "",
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { optionOneText, optionTwoText } = this.state;
    const { dispatch, history } = this.props;

    dispatch(handleAddQuestion(optionOneText, optionTwoText));

    this.setState(() => ({
      optionOneText: "",
      optionTwoText: "",
    }));

    history.push("/");
  };

  render() {
    const { optionOneText, optionTwoText } = this.state;
    return (
      <div className="card w-50 mx-auto my-4">
        <h3 className="card-header text-center">Create New Question</h3>
        <div className="card-body">
          <h6 className="card-title text-secondary mb-4">
            Complete the question:
          </h6>
          <h4>Would you rather ...</h4>
          <form className="new-question mt-4" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter Option One Text Here"
                value={optionOneText}
                onChange={(e) =>
                  this.setState(() => ({
                    optionOneText: e.target.value,
                  }))
                }
                className="form-control"
                maxLength={280}
              />
            </div>
            <div className="d-flex justify-content-between mb-3">
              <div className="line"></div>
              <span className="or font-weight-bold">OR</span>
              <div className="line"></div>
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter Option One Text Here"
                value={optionTwoText}
                onChange={(e) =>
                  this.setState(() => ({
                    optionTwoText: e.target.value,
                  }))
                }
                className="form-control"
                maxLength={280}
              />
            </div>
            <button
              className="btn btn-info w-100"
              type="submit"
              disabled={optionOneText === "" || optionTwoText === ""}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(connect()(NewQuestion));
