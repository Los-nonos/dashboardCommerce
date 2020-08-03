import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import GridContainer from "../../components/atoms/Grid/GridContainer";
import FilterSearch from "../../components/organisms/FilterSearch/filterSearch";
import GridItem from "../../components/atoms/Grid/GridItem";
import Card from "../../components/molecules/Card/Card";
import CardHeader from "../../components/molecules/Card/CardHeader";
import CardBody from "../../components/molecules/Card/CardBody";
import * as searchActions from "../../actions/SearchProductActions";
import Notification from "../../components/molecules/Notification/Notification";
import SearchProductTable from "../../components/molecules/Tables/SearchProductTable";
import { showNotification } from "../../actions/GeneralActions";
import SearchIcon from "@material-ui/icons/Search";
import Pagination from "../../components/molecules/Pagination/Pagination";
import { withStyles } from "@material-ui/core";
import searchStyle from "../../styles/dashboard/containers/Search/SearchPageStyles";

class SearchProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      page: this.props.page,
      orderBy: "registrationDate",
      order: "desc",
      currentFilters: {
        categoryName: "",
        filterName: "",
        filterOption: "",
        valueFilterOption: "",
        query: ""
      }
    };
    this.dispatch = props.dispatch;
    this.handleLoadSearchProducts();
  }

  handleChangeCurrentFiltersState = currentFilters => {
    this.setState({ currentFilters: currentFilters });
  };

  listProducts = () => {
    const products = [];

    for (const product of this.props.products) {
      const characteristics = [];

      for (const characteristic of product.characteristics) {
        characteristics.push(characteristic.value);
      }
      let listOfCharacteristics = characteristics.toString();
      listOfCharacteristics = listOfCharacteristics.replace(/,/gi, ", ");
      console.log(product);
      const dataProduct = {
        visibleData: [product.title, product.price, listOfCharacteristics],
        uuid: product.uuid,
        id: product.id
      };

      products.push(dataProduct);
    }

    return products;
  };

  handleChangeOrderState = (orderBy, order) => {
    this.setState({ orderBy, order });
  };

  handleLoadSearchProducts = () => {
    this.dispatch(searchActions.checkRoles(["sales", "admin"]));
    this.dispatch(
      searchActions.searchProducts(
        this.state,
        this.props.page,
        this.state.orderBy,
        this.state.order
      )
    );
  };

  pagination = () => {
    const pages = [
      {
        text: "PREV",
        onClick: () => {
          this.dispatch(searchActions.previousPage());
        }
      }
    ];
    for (let index = 1; index <= this.props.totalPages; index++) {
      if (index === this.props.page) {
        pages.push({ text: index, active: true });
      } else {
        pages.push({
          text: index,
          onClick: () => {
            this.dispatch(searchActions.selectPage(index));
          }
        });
      }
    }
    pages.push({
      text: "NEXT",
      onClick: () => {
        this.dispatch(searchActions.nextPage());
      }
    });
    return pages;
  };

  closeNotification = () => {
    this.dispatch(searchActions.closeNotification());
  };

  render() {
    if (this.state.page !== this.props.page) {
      this.setState({ page: this.props.page });
      this.handleLoadSearchProducts();
    }
    let productsData = [];
    if (this.props.products[0]) {
      productsData = this.listProducts();
    }

    const { classes } = this.props;
    return (
      <>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Notification closeNotification={this.closeNotification} />
          </GridItem>
        </GridContainer>
        <FilterSearch
          loadFilters={searchActions.loadFilters}
          searchProducts={searchActions.searchProducts}
          changeCurrentFiltersState={this.handleChangeCurrentFiltersState}
          page={this.state.page}
          orderBy={this.state.orderBy}
          order={this.state.order}
        />
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Productos</h4>
                <p className={classes.cardCategoryWhite}>
                  Todos los productos están listados aquí
                </p>
              </CardHeader>
              <CardBody>
                <SearchProductTable
                  tableHeaderColor="primary"
                  tableHead={["Nombre", "Precio", "Caracteristicas"]}
                  tableData={productsData}
                  seeDetails={searchActions.seeDetails}
                  showNotification={showNotification}
                  changeOrder={searchActions.searchProducts}
                  changeOrderState={this.handleChangeOrderState}
                  searchRooftopperState={this.state}
                  addToCart={searchActions.addToCart}
                />
              </CardBody>
            </Card>
          </GridItem>
          <div className={classes.center}>
            <Pagination pages={this.pagination()} color="primary" />
          </div>
        </GridContainer>
      </>
    );
  }
}

SearchProducts.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  page: PropTypes.number,
  updateModal: PropTypes.bool,
  createModal: PropTypes.bool,
  notification: PropTypes.bool,
  message: PropTypes.string,
  products: PropTypes.array
};

const mapStateToProps = state => {
  return state.searchReducer;
};

export default connect(mapStateToProps)(
  withStyles(searchStyle)(SearchProducts)
);
