import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import QueueAnim from 'rc-queue-anim/lib';

export default class Success extends Component {
  constructor(props){
    super(props);
  }

  state ={
    aptitudeAccuracy : 0,
    computerAccuracy : 0
  }

  componentDidMount() {
    debugger;
    console.log(this.props);
    if (this.props.history.action === "REPLACE") {
      this.setState(prevState =>({
        aptitudeAccuracy : this.props.location.state.aptitudeAccuracy,
        computerAccuracy : this.props.location.state.computerAccuracy
      }));
    }
    else if(this.props.history.action === "POP")
      this.props.history.push('/400')
  }

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
                  <h1 className="oops">Congratulations.. </h1>
                  <h2 className="oops">You have cleared the test.</h2>
                  <h2 className="mb-30">The instructions will be provided to you for further process.</h2>

                  <div style={{ marginBottom:'5%', height :'20%', backgroundColor:'black'}}>
                    <h1 style={{color :'white', textAlign: 'center', paddingTop :'10px', paddingBottom :'10px'}}>Your success code is { this.state.aptitudeAccuracy <=9 ? "0" + this.state.aptitudeAccuracy : this.state.aptitudeAccuracy}  { this.state.computerAccuracy <= 9 ? "0" + this.state.computerAccuracy : this.state.computerAccuracy}</h1>
                  </div>

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
