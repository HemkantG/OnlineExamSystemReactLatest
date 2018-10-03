import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import LinearProgress from '@material-ui/core/LinearProgress';
import Toolbar from '@material-ui/core/Toolbar';
import MatButton from '@material-ui/core/Button';

import RctCollapsibleCard from '../RctCollapsibleCard/RctCollapsibleCard';
import AppConfig from 'Constants/AppConfig';

export default class Instructions extends Component {
    render() {
        return (
            <div className="rct-session-wrapper">
                <AppBar position="static" className="session-header">
                    <Toolbar>
                        <div className="container">
                            <div className="d-flex justify-content-between">
                                <div className="session-logo">
                                    <Link to="/">
                                        <img src={AppConfig.appLogo} alt="session-logo" width="110" height="35" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Toolbar>
                </AppBar>
                <div className="session-inner-wrapper" >
                    <div className="container">
                        <div className="row row-eq-height">
                            <RctCollapsibleCard>
                                <h2 className="heading">Overview</h2>
                                <p>
                                    At ESPL , we value our people as our assets and continuously strive to facilitate the enhancement of their skills. This Freshers Test is designed to accomplish the same in a very innovative way. Your technical skills drive the services that we provide to our valuable customers. So here we, introduce a program that has been well researched to benchmark your current level and put you on fast track to the next level of expertise. This Test is designed to achieve the following:
								</p>
                                <ol style={{ "paddingLeft": "2.5rem" }}>
                                    <li>It will let you know your current expertise in terms of your skills.</li>
                                    <li>It will give us an opportunity to design your training tracks which are unique to your individual needs.</li>
                                    <li>It will give self-targets to you to achieve your technical goals.</li>
                                    <li>It will help us align your skills with our customer goals.</li>
                                </ol>
                                <p>
                                    Lets give our BEST to the TEST and next 50 mins will lead to a new growth in your technical career.
								</p>
                            </RctCollapsibleCard>
                            <RctCollapsibleCard>
                                <h2 className="heading">General Guidelines & Marking Scheme</h2>
                                <ol style={{ "paddingLeft": "2.5rem" }}>
                                    <li>In all there are 40 questions, each section comprises of 20 questions 1 mark each.</li>
                                    <li>Total duration of the test is 50 min.</li>
                                    <li>There is no negative marking for wrong answers.</li>
                                    <li>On completion of the test please click the Submit button to submit your answers. </li>
                                    <li>
                                        <strong>
                                            Every question has 40 seconds, if no option is selected in allotted time the question will be left unanswered. 
                                            Duration of test is 50 minutes, the test will auto-submit after time is over.
                                        </strong>
                                    </li>
                                    <li>
                                        You cannot move back and forth between questions during the test once started.
                                    </li>
                                    <li>
                                    If you think that the visible option is the correct you may select that option as the answer, if it is the correct answer for the question then you score 1 mark for that question.
                                    If the selected option is not the right answer for that question, you lose 1 mark.
									</li>
                                    <li>
                                    If you think that the visible option is not the correct answer, you may view the next option.
                                    If the newly visible option is the correct answer to the question and you select it as the answer, then you score 1 mark for that question.
                                    If after viewing the newly visible option you mark the previous option as answer, your question looses (((total number of questions) - (number of visible options)) * 0.1) of the total weightage and you will only score [(marks for question) - (((total number of questions) - (number of visible options)) * 0.1)] marks for this question <strong>if the answer is correct</strong>.
									</li>
                                    {/* <li>
                                        
									</li> */}
                                </ol>
                            </RctCollapsibleCard>
                            <Link to="/register">
                                <MatButton variant="raised" color="primary" className="mr-10 mb-10 text-white btn-icon" size="medium">
                                    Acknowledge & Proceed
                                    <i className="zmdi zmdi-check-all"></i>
                                </MatButton>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}