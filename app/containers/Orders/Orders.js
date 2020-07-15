import React from 'react';
import { connect } from 'react-redux';


class Orders extends React.Component {
  render() {
    return (
      <div>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return state.ordersReducer;
}


export default connect(mapStateToProps)(Orders);