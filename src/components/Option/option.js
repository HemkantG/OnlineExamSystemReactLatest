import MatButton from '@material-ui/core/Button';
import React, { Component } from 'react';

const option = (props) => {
    return (
        <div className="option row" style={ {padding: "15px"}}>
            <h3 className="col-md-8">{String.fromCharCode(97+props.index) + ") "}{props.optionDescription}</h3>
            <MatButton onClick={() => props.onSubmit(props.index)} variant="raised" className="btn-success mr-10 mb-10 text-white btn-icon"><i className="zmdi zmdi-check-all"></i> Submit</MatButton>
            <MatButton style={{ visibility: props.moreOptionVisibility }} onClick={() => props.onMoreOptions(props.index)} variant="raised" className="btn-danger mr-10 mb-10 text-white btn-icon"><i className="zmdi zmdi-flash"></i> Option++</MatButton>
        </div>
    )
}
export default option;