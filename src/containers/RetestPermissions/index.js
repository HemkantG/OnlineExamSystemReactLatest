import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../api';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Scrollbars } from 'react-custom-scrollbars';
import { Table } from 'reactstrap';
import AppConfig from 'Constants/AppConfig';
import Loader from "@material-ui/core/CircularProgress";
import MatButton from "@material-ui/core/Button";


export default class ApproveRetests extends Component {
    state = {
        approvalList: [],
        loading: true
    }
    async componentDidMount() {
        try {
            const response = await axios.get('retestCandidates', {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjAsInVzZXJOYW1lIjoiYWRtaW4iLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1MzkxNjcxMTd9.3TS9ixP9ozCT6ZF4_TM4ZVBMsKdADWoOL1I9XkrpZ4Q'
                },

            })
            this.setState({ approvalList: response.data });
            this.setState({ loading: false });
        }
        catch (error) {
            this.props.history.push('/' + error.response.status);
        }
    };

    allowRetestRequestBtnClicked = async (key, UserId, UserName) => {

        try {
            this.setState({ loading: true })
            const response = await axios.post('grantRetest', { UserId: UserId, UserName: UserName }, {
                headers: {
                    'x-auth-token': localStorage.getItem('espltoken')
                }
            });
            const listofApprovals = [...this.state.approvalList]
            const updatedListofApprovals = listofApprovals.filter(element => element.UserID != UserId)
            this.setState({ approvalList: updatedListofApprovals, loading: false })

        }
        catch (error) {
            this.props.history.push('/' + error.response.status);
        }

    };

    render() {
        const { approvalList } = this.state;
        return this.state.loading ? (<Loader
            style={loaderStyle}
            color={"secondary"}
            loading={this.state.loading.toString()}
        />) : (
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
                                <div className="col-sm-4 col-md-2 col-lg-2"></div>
                                <div className="col-sm-4 col-md-8 col-lg-8">
                                    <div className="session-body text-center">
                                        <div className="session-head mb-30">
                                            <h2 className="font-weight-bold">Retest Approval</h2>
                                            <p className="mb-0">List of candidates requesting approval for retest.</p>
                                        </div>
                                        <Scrollbars className="rct-scroll" autoHeight autoHeightMin={100} autoHeightMax={620} autoHide>
                                            <Table hover className="mb-0" responsive>
                                                <thead>
                                                    <tr>
                                                        <th>UserId </th>
                                                        <th>UserName</th>
                                                        <th>Name</th>
                                                        <th>Grant Request</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {approvalList.length > 0 && approvalList.map((data, key) => {
                                                        return (
                                                            <tr key={key}>
                                                                <td>{data.UserID}</td>
                                                                <td>{data.UserName}</td>
                                                                <td>{data.FirstName + " " + data.LastName}</td>
                                                                <td>
                                                                    {/* <Button
                                                                        color="primary"
                                                                        className="btn-block text-white w-100"
                                                                        variant="raised"
                                                                        size="medium"
                                                                        onClick={() => this.allowRetestRequestBtnClicked(key, data.UserID, data.UserName)}>
                                                                        Approve Retest
                                                                    </Button> */}

                                                                    <MatButton
                                                                        onClick={() => this.allowRetestRequestBtnClicked(key, data.UserID, data.UserName)}
                                                                        variant="raised"
                                                                        className="btn-success mr-10 mb-10 text-white btn-icon">
                                                                        <i className="zmdi zmdi-check-all" /> Approve Retest
                                                                    </MatButton>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </Table>
                                        </Scrollbars>
                                    </div>
                                </div>
                                <div className="col-sm-4 col-md-2 col-lg-2"></div>
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


