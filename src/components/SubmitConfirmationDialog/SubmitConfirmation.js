/**
 * Delete Confirmation Dialog
 */
import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

class SubmitConfirmation extends Component {

    state = {
        open: false
    }

    // open dialog
    open = () => {
        this.setState({ open: true });
    }

    // close dialog
    close = () => {
        this.setState({ open: false });
    }

    onConfirm = () => {
        this.close();
        this.props.onConfirm();
    }

    componentDidMount() {
        this.setState({ open: this.props.showDialog })
    }

    render() {
        const { title, message } = this.props;
        return (
            <Dialog
                open={this.state.open}
                onClose={() => this.close()}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.close()} className="btn-danger text-white">
                        Cancel
                    </Button>
                    <Button onClick={this.onConfirm} className="btn-primary text-white" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default SubmitConfirmation;
