/**
 * Form Dialog
 */
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class FormDialog extends React.Component {

	state = {
		open: false,
		password: ''
	};

	componentDidMount() {
		this.setState({ open: this.props.open });
	}

	onRequestRetest = () => {
		this.props.showDialogHandler();
		this.props.proceedHandlerWithAdminPermissions();
	}

	render() {
		return (
			<div>
				<Dialog open={this.props.open} onClose={this.props.showDialogHandler} aria-labelledby="form-dialog-title">
					<DialogTitle id="form-dialog-title">Submit request for retest.</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Your request for retest will be submitted to admin. Please press start test after some time.
            			</DialogContentText>
						{/* <TextField onChange={(event) => this.setState({ password: event.target.value })} autoFocus margin="dense" id="password" label="password" type="password" fullWidth /> */}
					</DialogContent>
					<DialogActions>
						<Button variant="raised" onClick={this.props.showDialogHandler} color="primary" className="text-white">
							Cancel
            			</Button>
						<Button variant="raised" onClick={this.onRequestRetest} className="btn-info text-white">
							Request
            		</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}
