import React, { Component, PropTypes } from 'react'
import Snackbar from 'material-ui/lib/snackbar';
import RaisedButton from 'material-ui/lib/raised-button';

export default class MessageBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleTouchTap = () => {
    this.setState({
      open: true,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const { open, message } = this.props
    return (
      <div>
        <Snackbar
          open= {open}
          message= {message}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}


MessageBox.propTypes = {
  message: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
}

export default MessageBox;
