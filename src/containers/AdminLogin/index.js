import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import axios from '../../api/';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MatButton from '@material-ui/core/Button';
import Button from '@material-ui/core/Button';

import AppConfig from 'Constants/AppConfig';
import RctCollapsibleCard from '../../components/RctCollapsibleCard/RctCollapsibleCard';

export default class AdminLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            UserName: 'admin',
            Password: '',
            errorMessage: null
        };

        this.onPasswordChanged = this.onPasswordChanged.bind(this);
        this.onUserNameChanged = this.onUserNameChanged.bind(this);
    }

    onUserLoginClick = async () => {
        this.setState({ errorMessage: null });

        try {
            const response = await axios.post('adminLogin', { UserName: this.state.UserName, Password: this.state.Password })
            if (response.status === 200) {
                localStorage.setItem('espltoken', response.headers['x-auth-token']);
                this.props.history.push('/retestApprovals');
            }

        }
        catch (error) {
            if (error.response.status === 403) {
                this.setState({ errorMessage: 'Invalid username or password!' })
            }
            else
                this.props.history.push('/500');
        }
    }

    componentDidMount(){

    }

    onPasswordChanged = (event) => {
        this.setState({ Password: event.target.value });
    };

    onUserNameChanged = (event) => {
        this.setState({ UserName: event.target.value });
    };


    render() {
        return (
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
                <div className="session-inner-wrapper" >
                    <div className="container">
                        <div className="row row-eq-height">
                            <div className="col-xl-3"></div>
                            <div className="col-sm-12 col-md-12 col-xl-6">
                                <RctCollapsibleCard heading="Admin Login">
                                    <div style={{ display: 'flex', justifyContent: 'center',color:'red'}}><h3>{this.state.errorMessage}</h3></div>
                                        <Form>
                                            <FormGroup className="has-wrapper">
                                                <Label for="admin-username">Admin Username</Label>
                                                <Input type="text" value={this.state.UserName} name="admin-username" id="admin-username" className="has-input input-lg" placeholder="Enter Email Address" onChange={this.onUserNameChanged} required />
                                            </FormGroup>
                                            <FormGroup className="has-wrapper">
                                                <Label for="admin-pwd">Password</Label>
                                                <Input value={this.state.Password} type="Password" name="admin-pwd" id="admin-pwd" className="has-input input-lg" placeholder="Password" onChange={this.onPasswordChanged} required />
                                            </FormGroup>
                                            <FormGroup className="mb-15">
                                                <Button
                                                    color="primary"
                                                    className="btn-block btn-success text-white w-100"
                                                    variant="raised"
                                                    size="large"
                                                    onClick={() => this.onUserLoginClick()}>
                                                    Sign In
                                            </Button>
                                            </FormGroup>
                                            <Link to="/admin/layout" />
                                        </Form>
                                </RctCollapsibleCard>
                                    </div>
                                    <div className="col-xl-3"></div>
                        </div>
                            </div>
                        </div>
                    </div>
                    );
                }
            }
