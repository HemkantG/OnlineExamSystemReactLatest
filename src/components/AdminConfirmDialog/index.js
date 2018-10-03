/**
 * Form Dialog
 */
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class FormDialog extends React.Component {

	state = {
		open: false,
	};

	componentDidMount(){
		this.setState({open: this.props.showDialog});
	}

	render() {
		return (
			<div>
				<Dialog open={this.props.showDialog} onClose={this.props.showDialogHandler} aria-labelledby="form-dialog-title">
					<DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
					<DialogContent>
						<DialogContentText>
							To Apply for Re-test, Enter Admin Password.
            		</DialogContentText>
						<TextField autoFocus margin="dense" id="password" label="password" type="password" fullWidth />
					</DialogContent>
					<DialogActions>
						<Button variant="raised" onClick={this.props.showDialogHandler} color="primary" className="text-white">
							Cancel
            		</Button>
						<Button variant="raised" onClick={this.props.proceedHandler} className="btn-info text-white">
							Proceed
            		</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}
