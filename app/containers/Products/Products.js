import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import GridContainer from "../../components/atoms/Grid/GridContainer";
import { withStyles } from "@material-ui/core";
import * as actions from "../../actions/ProductsActions";
import * as generalActions from "../../actions/GeneralActions";
import Button from "@material-ui/core/Button";
import GridItem from "../../components/atoms/Grid/GridItem";
import Notification from "../../components/molecules/Notification/Notification";
import Card from "../../components/molecules/Card/Card";
import CardHeader from "../../components/molecules/Card/CardHeader";
import CardBody from "../../components/molecules/Card/CardBody";
import Pagination from "../../components/molecules/Pagination/Pagination";
import Slide from "@material-ui/core/Slide";
import ProductsTable from "../../components/molecules/Tables/ProductsTable";

import styles from "../../styles/dashboard/containers/Products/ProductContainerStyles";
import FormProducts from "../../components/organisms/Products/formProducts";
import ViewProduct from "../../components/organisms/Products/viewProduct";

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1
    };
    this.dispatch = props.dispatch;
    this.handleLoadProducts();
  }

  handleLoadProducts = () => {
    this.dispatch(actions.checkRoles(["sales", "deposits"]));
    this.dispatch(actions.loadFilters());
    this.dispatch(
      actions.listProducts(
        this.state.page,
        this.state.orderBy,
        this.state.order
      )
    );
  };

  handleChangeOrderState = (orderBy, order) => {
    this.setState({ orderBy, order });
  };

  handleClickCreateProducts = () => {
    this.dispatch(actions.showCreateModal());
  };

  closeNotification = () => {
    this.dispatch(actions.closeNotification());
  };

  listProducts = () => {
    const products = [];
    for (const product of this.props.products) {
      let characteristics = product.characteristics.toString();
      characteristics = characteristics.replace(/,/gi, ", ");

      const dataProduct = {
        visibleData: [
          product.title,
          product.price,
          product.description,
          characteristics
        ],
        uuid: product.uuid,
        id: product.id
      };
      products.push(dataProduct);
    }

    return products;
  };

  pagination = () => {
    const pages = [
      {
        text: "PREV",
        onClick: () => {
          this.dispatch(actions.previousPage());
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
            this.dispatch(actions.selectPage(index));
          }
        });
      }
    }
    pages.push({
      text: "NEXT",
      onClick: () => {
        this.dispatch(actions.nextPage());
      }
    });
    return pages;
  };

  render() {
    if (this.state.page !== this.props.page) {
      this.setState({ page: this.props.page });
      //this.handleLoadProducts();
    }
    const { classes } = this.props;
    const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="down" ref={ref} {...props} />;
    });

    let productsData = [];
    if (this.props.products[0]) {
      productsData = this.listProducts();
    }

    return (
      <>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color={"primary"}>
                <h4 className={classes.cardTitleWhite}>Productos</h4>
                <p className={classes.cardCategoryWhite}>
                  Todos los productos están listados aquí
                </p>
              </CardHeader>
              <CardBody>
                <ProductsTable
                  tableHeaderColor={"primary"}
                  tableHead={[
                    "Nombre",
                    "Precio",
                    "Descripción",
                    "Caracteristicas"
                  ]}
                  tableData={productsData}
                  getProductByUuid={actions.getProductsByUuid}
                  completeProduct={actions.completeProduct}
                  seeDetails={actions.seeDetails}
                  listProducts={actions.listProducts}
                  showOnWebsite={actions.showProductOnWebsite}
                  changeOrderState={this.handleChangeOrderState}
                  page={this.state.page}
                />
              </CardBody>
            </Card>
          </GridItem>
          <div className={classes.center}>
            <Pagination pages={this.pagination()} color="primary" />
          </div>
        </GridContainer>
        <GridContainer>
          <GridItem>
            {this.props.modalShow.createModal ||
            this.props.modalShow.updateModal ? (
              <FormProducts
                closeModal={actions.closeModal}
                updateProduct={actions.updateProduct}
                createProduct={actions.createProduct}
                selectedCategory={actions.selectedCategory}
                Transition={Transition}
                productsUpdated={actions.productsUpdated}
                showNotification={generalActions.showNotification}
              />
            ) : null}
            {this.props.modalShow.viewModal ? (
              <ViewProduct
                closeModal={actions.closeModal}
                Transition={Transition}
                showNotification={generalActions.showNotification}
              />
            ) : null}
            <Button
              id={"createProductButton"}
              color={"primary"}
              onClick={this.handleClickCreateProducts}
            >
              Cargar nuevo producto
            </Button>
            <Notification closeNotification={this.closeNotification} />
          </GridItem>
        </GridContainer>
      </>
    );
  }
}

Products.propTypes = {
  dispatch: PropTypes.func,
  page: PropTypes.number,
  totalPages: PropTypes.number,
  updateModal: PropTypes.bool,
  createModal: PropTypes.bool,
  notification: PropTypes.bool,
  message: PropTypes.string,
  products: PropTypes.array
};

const mapStateToProps = state => {
  return { ...state.productsReducer, ...state.generalReducer };
};

export default connect(mapStateToProps)(withStyles(styles)(Products));
