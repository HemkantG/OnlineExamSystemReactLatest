import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Link } from "react-router-dom";
import AppConfig from "Constants/AppConfig";
import CountDownTimer from "Components/CountDown/CountDown";
import Option from "../../components/Option/option";
import DirectAnswer from "../../components/Option/directAnswer";

import axios from "../../api";
import Loader from "@material-ui/core/CircularProgress";

class Test extends Component {
  constructor(props) {
    super(props);
    this.countDownTimer = React.createRef();
  }

  state = {
    currentQuestionIndex: 0,
    currentQuestion: null,
    currentOptionIndex: 0,
    options: [],
    aptituteAccuracy: 0,
    aptitudeConfidence: 0,
    computerAccuracy: 0,
    computerConfidence: 0,
    questions: null,
    loading: true
  };

  preProcessQuestions = questions => {
    const transFormedDS = [];
    questions.Questions.forEach(element => {
      let options = questions.Options.filter(
        a => element.QuestionID === a.QueID
      );
      let type = questions.Options.find(a => element.QuestionID === a.QueID)
        .AnswerType;
      transFormedDS.push({
        Section: element.SectionName === "Section-1" ? 1 : 2,
        Question: element.QuestionDescription,
        Type: type,
        Options: options
      });
    });
    return transFormedDS;
  };

  async componentDidMount() {

    if (this.props.history.action === "REPLACE") {
      const questions = this.props.history.location.state.questions;

      const option = this.handleDirectAnswerQuestions(
        questions[this.state.currentQuestionIndex]
      );

      this.setState(prevState => ({
        loading: false,
        questions: questions,
        currentQuestion: questions[prevState.currentQuestionIndex],
        options: [
          ...prevState.options,
          option != null ? (
            option
          ) : (
              <Option
                key={prevState.currentOptionIndex}
                onSubmit={this.onSubmit}
                onMoreOptions={this.onMoreOptions}
                index={prevState.currentOptionIndex}
                optionDescription={
                  questions[prevState.currentQuestionIndex].Options[
                    prevState.currentOptionIndex
                  ].AnswerDescription
                }
              />
            )
        ],
        currentOptionIndex: prevState.currentOptionIndex + 1
      }));
    }

    else {
      this.props.history.push('/refreshError');
    }

  }

  onSubmit = choosenOption => {
    this.calculateAccuracyConfidence(choosenOption);
    this.loadNextQuestion();
  };

  onDirectAnswerSubmit = answer => {
    this.calculateDirectSubmitScore(answer);
    this.loadNextQuestion();
  };

  calculateDirectSubmitScore = answer => {
    if (this.state.currentQuestion.Options[0].AnswerDescription === answer) {
      if (this.state.currentQuestion.Section === 1) {
        this.updateAptituteScoreForDirectSubmission();
      } else {
        this.updateComputerScoreForDirectSubmission();
      }
    }
  };

  updateAptituteScoreForDirectSubmission = () => {
    this.setState(prevState => ({
      AptitudeAccuracy: prevState.AptitudeAccuracy + 1,
      AptitudeConfidence: prevState.AptitudeConfidence + 1
    }));
  };

  updateComputerScoreForDirectSubmission = () => {
    this.setState(prevState => ({
      ComputerAccuracy: prevState.ComputerAccuracy + 1,
      ComputerConfidence: prevState.ComputerConfidence + 1
    }));
  };

  calculateAccuracyConfidence = choosenOption => {
    if (
      this.state.currentQuestion.Options[choosenOption].CorrectAnswer == true
    ) {
      if (this.state.currentQuestion.Section === 1) {
        this.updateAptituteScore(choosenOption);
      } else {
        this.updateComputerScore(choosenOption);
      }
    }
  };

  handleDirectAnswerQuestions = question => {
    if (question.Type === 2)
      return (
        <DirectAnswer
          key={this.state.currentOptionIndex}
          onDirectAnswerSubmit={this.onDirectAnswerSubmit}
        />
      );
    return null;
  };

  updateAptituteScore = choosenOption => {
    this.setState(prevState => ({
      aptituteAccuracy: prevState.aptituteAccuracy + 1,
      aptitudeConfidence:
        prevState.aptitudeConfidence +
        (1 -
          (prevState.currentOptionIndex - 1 - choosenOption) *
          (1 / prevState.currentQuestion.Options.length))
    }));
  };

  updateComputerScore = choosenOption => {
    this.setState(prevState => ({
      computerAccuracy: prevState.computerAccuracy + 1,
      computerConfidence:
        prevState.computerConfidence +
        (1 -
          (prevState.currentOptionIndex - 1 - choosenOption) *
          (1 / prevState.currentQuestion.Options.length))
    }));
  };

  loadNextQuestion = async () => {
    if (this.state.currentQuestionIndex === this.state.questions.length - 1) {
      this.setState({ loading: true });
      await this.postResult();
      this.setState({ loading: false });
    } else {
      const option = this.handleDirectAnswerQuestions(
        this.state.questions[this.state.currentQuestionIndex + 1]
      );

      this.setState(prevState => ({
        currentOptionIndex: 1,
        shouldTimerUpdate: false,
        currentQuestion:
          prevState.questions[prevState.currentQuestionIndex + 1],
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        options: [
          option != null ? (
            option
          ) : (
              <Option
                key={0}
                onSubmit={this.onSubmit}
                onMoreOptions={this.onMoreOptions}
                index={0}
                optionDescription={
                  prevState.questions[prevState.currentQuestionIndex + 1]
                    .Options[0].AnswerDescription
                }
              />
            )
        ]
      }));
      this.countDownTimer.current.loadNextQuestion();
    }
  };

  onMoreOptions = index => {
    if (
      this.state.currentQuestion.Options.length ===
      this.state.currentOptionIndex
    ) {
      return;
    }
    this.loadNextOption();
  };

  loadNextOption = () => {
    this.setState(prevState => ({
      shouldTimerUpdate: false,
      options: [
        ...prevState.options,
        <Option
          key={prevState.currentOptionIndex}
          onSubmit={this.onSubmit}
          onMoreOptions={this.onMoreOptions}
          index={prevState.currentOptionIndex}
          optionDescription={
            this.state.currentQuestion.Options[prevState.currentOptionIndex]
              .AnswerDescription
          }
        />
      ],
      currentOptionIndex: prevState.currentOptionIndex + 1
    }));
  };

  async postResult() {

    let token = localStorage.getItem('espltoken');

    let result = await axios.post(
      "results",
      {
        AptitudeAccuracy: this.state.aptituteAccuracy,
        AptitudeConfidence: this.state.aptitudeConfidence,
        ComputerAccuracy: this.state.computerAccuracy,
        ComputerConfidence: this.state.computerConfidence
      },
      {
        headers: {
          "x-auth-token": token
        }
      }
    );

    if (result.data.SelectionStatus === "Selected")
      this.props.history.push('/success');
    else
      this.props.history.push('/thanks');

  }

  render() {
    const transformedOptions = this.state.options.map((option, index) => {
      if (
        this.state.currentQuestion.Type === 1 &&
        (index != this.state.options.length - 1) |
        (index === this.state.currentQuestion.Options.length - 1)
      ) {
        return <Option {...option.props} moreOptionVisibility={"hidden"} />;
      }
      return option;
    });

    return this.state.loading ? (
      <Loader
        style={loaderStyle}
        color={"secondary"}
        loading={this.state.loading.toString()}
      />
    ) : (
        <div className="rct-session-wrapper">
          <AppBar position="static" className="session-header">
            <Toolbar>
              <div className="container">
                <div className="d-flex justify-content-between">
                  <div className="session-logo">
                    <Link to="/">
                      <img src={AppConfig.appLogoFull} alt="session-logo" width="200" height="30" />
                    </Link>
                  </div>
                </div>
              </div>
            </Toolbar>
          </AppBar>
          <div className="session-inner-wrapper" style={cardStyle}>
            <div className="container">
              <CountDownTimer
                ref={this.countDownTimer}
                loadNextQuestion={this.loadNextQuestion}
              />
              <div className="session-body">
                <div className="session-head mb-15">
                  <h2 className="d-flex">
                    {this.state.currentQuestion != null
                      ? this.state.currentQuestionIndex +
                      1 +
                      ". " +
                      this.state.currentQuestion.Question
                      : null}
                  </h2>
                  {transformedOptions}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
  }
}

const loaderStyle = {
  position: "fixed",
  top: "50%",
  left: "50%"
};

const cardStyle = {
  marginTop: "3%"
};
export default Test;
