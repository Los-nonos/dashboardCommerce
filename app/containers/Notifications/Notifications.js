import React from 'react';
import { connect } from 'react-redux';

class Notifications extends React.Component {
  render() {

  }
}

const mapStateToProps = state => {
  return state.notificationsReducer;
}

export default connect(mapStateToProps)(Notifications);