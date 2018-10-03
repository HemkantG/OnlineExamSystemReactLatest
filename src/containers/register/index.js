import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { DatePicker } from 'material-ui-pickers';
import moment from 'moment';
import axios from '../../api';
import axios1 from 'axios';
import Loader from "@material-ui/core/CircularProgress";
import AppConfig from 'Constants/AppConfig';
import AdminConfirmDialog from '../../components/AdminConfirmDialog';

export default class StudentDetails extends Component {
  state = {
    userId: '',
    fname: '',
    mname: '',
    lname: '',
    email: '',
    gender: '',
    maritalStatus: '',
    dob: moment().subtract(18, 'years'),
    contact: '',
    address1: '',
    address2: '',
    city: '',
    pincode: '',
    state: '',
    college: '',
    stream: '',
    referredbyName: '',
    referredbyContact: '',
    initialData: {
      allStates: [],
      allColleges: [],
      allStreams: []
    },
    questions: null,
    loading: false,
    showDialog: false
  }

  showDialogHandler = () => {
    this.setState({ showDialog: !this.state.showDialog })
  }
  proceedHandler = async() => {
    const questions = await this.getQuestions('questions');
    this.props.history.replace({ pathname: '/startTest', state: { questions: questions } })
  }

  proceedHandlerWithAdminPermissions = async(password) => {
    const questions = await this.getQuestions('questionswithAdminPermission',password);
    this.props.history.replace({ pathname: '/startTest', state: { questions: questions } })
  }

  getColleges() {
    return axios.get('colleges', { headers: { 'Access-Control-Allow-Origin': '*' } });
  }

  getStreams() {
    return axios.get('streames', { headers: { 'Access-Control-Allow-Origin': '*' } });
  }

  getStates() {
    return axios.get('states', { headers: { 'Access-Control-Allow-Origin': '*' } });
  }

  componentDidMount() {
    var self = this;
    axios1.all([this.getColleges(), this.getStreams(), this.getStates()])
      .then(axios1.spread(function (colleges, streams, states) {
        console.log(self.state);
        self.setState({ initialData: { allColleges: colleges.data, allStreams: streams.data, allStates: states.data } });
        console.log(self.state);
      }))
      .catch(error => {
        this.props.history.push('/500')
      });

    if (localStorage.getItem("espltoken") !== null) {
      localStorage.removeItem("espltoken");
    }
  }

  handleDateChange = (date) => {
    this.setState({ dob: date });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onFormSubmitHandler = async (event) => {
    event.preventDefault();
    if (this.state.gender == '' || this.state.maritalStatus == '' || this.state.state == '' || this.state.college == '' || this.state.stream == '') {
      alert('Please Fill all the required details.');
      return false;
    }

    let userData = {
      "UserName": this.state.userId,
      "FirstName": this.state.fname,
      "MiddleName": this.state.mname,
      "LastName": this.state.lname,
      "Gender": this.state.gender,
      "MaritalStatus": this.state.maritalStatus,
      "DOB": this.state.dob.format("MM/DD/YYYY"),
      "ContactNumber": this.state.contact,
      "Email": this.state.email,
      "AddressLine1": this.state.address1,
      "AddressLine2": this.state.address2,
      "PinCode": this.state.pincode,
      "City": this.state.city,
      "State": this.state.state,
      "CollegeName": this.state.college,
      "StreamName": this.state.stream,
      "RefferedBy": this.state.referredbyName,
      "RefferedByContact": this.state.referredbyContact
    }


    axios.post('users', userData, { headers: { 'Access-Control-Allow-Origin': '*' } })
      .then(async (response) => {
        this.setState({ loading: true });

        localStorage.setItem('espltoken', response.headers['x-auth-token']);
        localStorage.setItem("user_id", response.data.UserID);
        // if (!response.data.TestTaken && response.data.CountLogin > 1) {
        if (response.data.CountLogin > 1) {
          this.setState({ showDialog: true, loading: false });
        }
        else if (response.data.TestTaken) {
          //Test is done
        }
        else {
          await this.proceedHandler();
        }
      })
      .catch(error => {
        this.props.history.push('/500');
      });

    this.setState({ loading: false })

  }

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

  getQuestions = async (api,password) => {
    const token = localStorage.getItem('espltoken');
    const rawQuestionsData = await axios.get(api,
      {
        headers: { 'x-auth-token': token, 'admin-secret':password }
      }
    );
    console.log(rawQuestionsData);
    const questions = this.preProcessQuestions(rawQuestionsData.data);
    return questions;
  }

  render() {
    return this.state.loading ? (
      <Loader
        style={loaderStyle}
        color={"secondary"}
        loading={this.state.loading.toString()}
      />
    ) :
      (<div className="rct-session-wrapper">
        <AdminConfirmDialog proceedHandlerWithAdminPermissions={this.proceedHandlerWithAdminPermissions} showDialogHandler={this.showDialogHandler} showDialog={this.state.showDialog} />
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
        <div className="session-inner-wrapper">
          <div className="container">
            <div className="row row-eq-height">
              <div className="col-sm-12 col-md-12 col-lg-12">
                <div className="session-body text-center">
                  <div className="session-head mb-15">
                    <h2>Get started with {AppConfig.brandName}</h2>
                  </div>
                  <Form onSubmit={this.onFormSubmitHandler}>
                    <div className="row">
                      <div className="col-md-4">
                        <FormGroup className="has-wrapper">
                          <Input type="text" value={this.state.userId} name="user-id" idpx="user-id" className="has-input input-lg" placeholder="User Id" onChange={(e) => this.setState({ userId: e.target.value })} required />
                          <span className="has-icon"><i className="ti-user"></i></span>
                        </FormGroup>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4">
                        <FormGroup className="has-wrapper">
                          <Input type="text" value={this.state.fname} name="user-name" id="user-name" className="has-input input-lg" placeholder="First Name" onChange={(e) => this.setState({ fname: e.target.value })} required />
                          <span className="has-icon"><i className="ti-user"></i></span>
                        </FormGroup>
                      </div>
                      <div className="col-md-4">
                        <FormGroup className="has-wrapper">
                          <Input type="text" value={this.state.mname} name="user-name" id="user-name" className="has-input input-lg" placeholder="Middle Name" onChange={(e) => this.setState({ mname: e.target.value })} />
                          <span className="has-icon"><i className="ti-user"></i></span>
                        </FormGroup>
                      </div>
                      <div className="col-md-4">
                        <FormGroup className="has-wrapper">
                          <Input type="text" value={this.state.lname} name="user-name" id="user-name" className="has-input input-lg" placeholder="Last Name" onChange={(e) => this.setState({ lname: e.target.value })} required />
                          <span className="has-icon"><i className="ti-user"></i></span>
                        </FormGroup>
                      </div>
                    </div>


                    <div className="row">
                      <div className="col-md-4" style={{ 'marginBottom': '15px' }}>
                        <FormControl fullWidth>
                          <InputLabel htmlFor="gender-simple">Gender</InputLabel>
                          <Select value={this.state.gender} title="Select Gender from the List"
                            inputProps={{ name: 'gender' }} onChange={this.handleChange} required>
                            <MenuItem value={"Male"}>Male</MenuItem>
                            <MenuItem value={"Female"}>Female</MenuItem>
                            <MenuItem value={"Transgender"}>Transgender</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                      <div className="col-md-4" style={{ 'marginBottom': '15px' }}>
                        <FormControl fullWidth>
                          <InputLabel htmlFor="marital-simple">Marital Status</InputLabel>
                          <Select value={this.state.maritalStatus}
                            inputProps={{ name: 'maritalStatus' }} onChange={this.handleChange} required>
                            <MenuItem value={"Single"}>Single</MenuItem>
                            <MenuItem value={"Married"}>Married</MenuItem>
                            <MenuItem value={"Divorced"}>Divorced</MenuItem>
                            <MenuItem value={"Widowed"}>Widowed</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                      <div className="col-md-4" style={{ 'marginBottom': '15px' }}>
                        <FormControl fullWidth>
                          <div className="rct-picker">
                            <DatePicker
                              label="Choose a date"
                              value={this.state.dob}
                              onChange={this.handleDateChange}
                              animateYearScrolling={false}
                              leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
                              rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
                              maxDate={new Date().setFullYear(new Date().getFullYear() - 18)}
                              fullWidth
                              required
                            />
                          </div>
                        </FormControl>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <FormGroup className="has-wrapper">
                          <Input type="text" value={this.state.contact} pattern="[6789][0-9]{9}" title="Ten Digits number only" name="user-contact" id="contact" className="has-input input-lg" placeholder="Contact Number" onChange={(e) => this.setState({ contact: e.target.value })} required />
                          <span className="has-icon"><i className="ti-mobile"></i></span>
                        </FormGroup>
                      </div>
                      <div className="col-md-6">
                        <FormGroup className="has-wrapper">
                          <Input type="mail" value={this.state.email} name="user-mail" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" title="Enter valid email address" id="user-mail" className="has-input input-lg" placeholder="Enter Email Address" onChange={(e) => this.setState({ email: e.target.value })} required />
                          <span className="has-icon"><i className="ti-email"></i></span>
                        </FormGroup>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <FormGroup className="has-wrapper">
                          <Input type="text" value={this.state.address1} name="user-address1" id="addressLine1" className="has-input input-lg" placeholder="Address Line 1" onChange={(e) => this.setState({ address1: e.target.value })} />
                          <span className="has-icon"><i className="ti-home"></i></span>
                        </FormGroup>
                      </div>
                      <div className="col-md-6">
                        <FormGroup className="has-wrapper">
                          <Input type="text" value={this.state.address2} name="user-address2" id="addressLine2" className="has-input input-lg" placeholder="Address Line 2" onChange={(e) => this.setState({ address2: e.target.value })} />
                          <span className="has-icon"><i className="ti-home"></i></span>
                        </FormGroup>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <FormGroup className="has-wrapper">
                          <Input type="text" value={this.state.city} name="user-city" id="city" className="has-input input-lg" placeholder="City" onChange={(e) => this.setState({ city: e.target.value })} />
                          <span className="has-icon"><i className="ti-world"></i></span>
                        </FormGroup>
                      </div>
                      <div className="col-md-6">
                        <FormGroup className="has-wrapper">
                          <Input type="text" value={this.state.pincode} name="user-pincode" id="pincode" className="has-input input-lg" placeholder="Pin Code" onChange={(e) => this.setState({ pincode: e.target.value })} />
                          <span className="has-icon"><i className="ti-home"></i></span>
                        </FormGroup>
                      </div>
                    </div>

                    <div className="row" style={{ 'marginBottom': '15px' }}>
                      <div className="col-md-6" >
                        <FormControl fullWidth>
                          <InputLabel htmlFor="age-simple">State</InputLabel>
                          <Select value={this.state.state}
                            inputProps={{ name: 'state' }} onChange={this.handleChange}>
                            {
                              this.state.initialData.allStates.length > 0 ?
                                this.state.initialData.allStates.map(state => {
                                  return (<MenuItem key={state.id} value={state.name}>{state.name}</MenuItem>)
                                }) : null
                            }

                          </Select>
                        </FormControl>
                      </div>
                      <div className="col-md-6">
                        <div className="row" style={{ 'marginBottom': '15px' }}>
                          <div className="col-md-6">
                            <FormControl fullWidth>
                              <InputLabel htmlFor="age-simple">College</InputLabel>
                              <Select value={this.state.college}
                                inputProps={{ name: 'college' }} onChange={this.handleChange}>
                                {
                                  this.state.initialData.allColleges.length > 0 ?
                                    this.state.initialData.allColleges.map(college => {
                                      return (<MenuItem key={college.Id} value={college.collegeName}>{college.collegeName}</MenuItem>)
                                    }) : null
                                }

                              </Select>
                            </FormControl>
                          </div>
                          <div className="col-md-6">
                            <FormControl fullWidth>
                              <InputLabel htmlFor="age-simple">Stream</InputLabel>
                              <Select value={this.state.stream}
                                inputProps={{ name: 'stream' }} onChange={this.handleChange}>
                                {
                                  this.state.initialData.allStreams.length > 0 ?
                                    this.state.initialData.allStreams.map(stream => {
                                      return (<MenuItem key={stream.Id} value={stream.Stream}>{stream.Stream}</MenuItem>)
                                    }) : null
                                }
                              </Select>
                            </FormControl>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <FormGroup className="has-wrapper">
                          <Input type="text" value={this.state.referredbyName} name="user-tponame" id="tpoName" className="has-input input-lg" placeholder="Referred By/TPO Details" onChange={(e) => this.setState({ referredbyName: e.target.value })} />
                          <span className="has-icon"><i className="ti-user"></i></span>
                        </FormGroup>
                      </div>
                      <div className="col-md-6">
                        <FormGroup className="has-wrapper">
                          <Input type="text" value={this.state.referredbyContact} name="user-tpocontact" id="user-tpocontact" pattern="[6789][0-9]{9}" title="Ten Digits Number only" className="has-input input-lg" placeholder="Referred By/TPO - Contact" onChange={(e) => this.setState({ referredbyContact: e.target.value })} />
                          <span className="has-icon"><i className="ti-user"></i></span>
                        </FormGroup>
                      </div>
                    </div>
                    <FormGroup className="mb-15">
                      <Button type='submit'
                        className="btn-info text-white btn-block w-100"
                        variant="raised"
                        size="large">
                        Start Test
                    </Button>
                    </FormGroup>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>);
  }
}

const loaderStyle = {
  position: "fixed",
  top: "50%",
  left: "50%"
};
