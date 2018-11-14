import React, { Fragment, Component } from "react";
import "./CountDownTimer.css";

export default class CountDownTimer extends Component {
   
    constructor(props) {
        super(props);
        this.state = { seconds: props.time ? props.time : 40, questionTime: 0, timePerQuestion: { ...props }.questionTime };
        this.timer = 0;
        this.countDown = this.countDown.bind(this);
    }

    loadNextQuestion() {
        this.setState({ questionTime: 0 })
    }

    secondsToTime(secs) {
        let hours = Math.floor(secs / (60 * 60));

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        let obj = {
            h: hours,
            m: minutes,
            s: seconds
        };
        return obj;
    }


    componentDidMount() {
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar });
        this.startTimer();
    }

    startTimer() {
        if (this.timer === 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    countDown() {
        let seconds = this.state.seconds + 1;
        let questionTime = this.state.questionTime + 1;
        var progressBarWidth = 0;
        let $element = $('#progressBar');
        // Check if we're at max time.
        if (questionTime > this.state.timePerQuestion) {
            this.props.loadNextQuestion();
            this.setState({ questionTime: 0 });
            $element.find('div').animate({ width: progressBarWidth }, 400);
        }
        else {
            // Add one second, set state so a re-render happens.
            progressBarWidth = questionTime * $element.width() / this.state.timePerQuestion;
            $element.find('div').animate({ width: progressBarWidth }, 40);
            this.setState({
                time: this.secondsToTime(seconds),
                seconds: seconds,
                questionTime: questionTime
            });
        }
    }

    render() {
        return (
            // <div id="progressBar">
            <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-10 progressBarContainer">
                    <div id="progressBar">
                        <div className="bar" style={this.state.questionTime > (this.state.timePerQuestion - 10) ? { backgroundColor: '#FE4547', paddingRight :'5px' } : {paddingRight :'5px'}}>
                            {Math.floor(this.state.questionTime / this.state.timePerQuestion) + ":" + this.state.questionTime % this.state.timePerQuestion}
                        </div>
                    </div>
                </div>
            </div>
            // </div>
        );
    }
}