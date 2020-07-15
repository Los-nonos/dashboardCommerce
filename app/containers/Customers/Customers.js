import React from 'react';
import { connect } from 'react-redux';

class Customers extends React.Component {
  render() {
    return (
      <div>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return state.customerReducer;
}

export default connect(mapStateToProps)(Customers);