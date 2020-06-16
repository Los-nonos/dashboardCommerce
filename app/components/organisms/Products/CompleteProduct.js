import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import GridItem from "../../atoms/Grid/GridItem";
import CustomMaterialTable from "../../molecules/Tables/CustomMaterialTable";

class CompleteProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      characteristics: [],
      filters: this.props.dataToCompleteProduct.categories,
    }
  }

  getFilters = (filters) => {
    return filters.map(filter => {
      return filter.name;
    })
  }

  render() {
    return (
      <>
        <GridItem xs={12} sm={12} md={12}>
          <CustomMaterialTable
            title={'Caracteristicas'}
            columns={[
              {
                title: 'Caracteristica',
                field: 'characteristic',
                lookup: this.getFilters(this.props.dataToCompleteProduct.category.filters),
              },
              {
                title: 'Valor',
                field: 'value',
              }
            ]}
            data={this.state.characteristics}
            customFilters={this.state.filters}
            assignCharacteristicToProduct={this.props.assignCharacteristicToProduct}
            updateProductCharacteristic={this.props.updateProductCharacteristic}
            deleteProductCharacteristic={this.props.deleteProductCharacteristic}
          />
        </GridItem>
      </>
    );
  }
}

CompleteProduct.propTypes = {

};

const mapStateToProps = state => {
  return state.productsReducer
}

export default connect(mapStateToProps)(CompleteProduct);