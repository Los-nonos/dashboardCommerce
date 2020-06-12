import React from 'react';
import GridContainer from "../../components/atoms/Grid/GridContainer";
import FilterSearch from "../../components/organisms/FilterSearch/filterSearch";

class SearchProducts extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <GridContainer>
        <FilterSearch />
      </GridContainer>
    );
  }
}

export default SearchProducts;