/**
 * Countdown Timer
 */
import React, { Fragment, Component } from "react";

export default class CountDownTimer extends Component {
    constructor(props) {
        super(props);
        this.state = { time: {}, seconds: props.time ? props.time : 40, questionTime: {...props}.questionTime, timePerQuestion: {...props}.questionTime};
        this.timer = 0;
        this.countDown = this.countDown.bind(this);
    }

    loadNextQuestion() {
        this.setState({ questionTime: this.state.timePerQuestion })
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
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        let questionTime = this.state.questionTime - 1;

        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
            questionTime: questionTime
        });

        // Check if we're at zero.
        if (questionTime == 0) {
            this.props.loadNextQuestion();
            this.setState({ questionTime: this.state.timePerQuestion })
        }
    }

    render() {

        return (
            <Fragment>
                <h2 style={{ float: 'right', margin: '15px', color: 'red' }}>{this.state.questionTime < 10 ? `0${this.state.questionTime}` : this.state.questionTime}</h2>
            </Fragment>
        );
    }
}
