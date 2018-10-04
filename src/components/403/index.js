import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import QueueAnim from 'rc-queue-anim/lib';

export default class NotFound extends Component {
  render() {
    return (
      <QueueAnim type="bottom" duration={2000}>
        <div className="error-wrapper" key="1">
          <AppBar position="static" className="session-header">
            <Toolbar>
              <div className="container">
                <div className="d-flex justify-content-between">
                  <div className="session-logo">
                    <Link to="/">
                      <img src={require('Assets/img/esplLogo.png')} alt="session-logo" className="img-fluid" width="70" height="35" />
                    </Link>
                  </div>
                </div>
              </div>
            </Toolbar>
          </AppBar>
          <div className="session-inner-wrapper">
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-9 mx-auto">
                <div className="error-body text-center">
                  <h2 className="oops">Oops.. </h2>
                  <h2 className="bold mb-0">403</h2>
                  <h2 className="error-msg mb-30">Access Denied</h2>
                  <Button component={Link} to="/" variant="raised" className="btn-light btn-lg">Go To Home Page</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </QueueAnim>
    );
  }
}
