import React from "react";
import { connect } from "react-redux";
import Slide from "@material-ui/core/Slide";
import GridContainer from "../../components/atoms/Grid/GridContainer";
import GridItem from "../../components/atoms/Grid/GridItem";
import Card from "../../components/molecules/Card/Card";
import CardHeader from "../../components/molecules/Card/CardHeader";
import CardBody from "../../components/molecules/Card/CardBody";
import ProductsTable from "../../components/molecules/Tables/ProductsTable";
import * as actions from "../../actions/ProductsActions";
import Pagination from "../../components/molecules/Pagination/Pagination";
import * as generalActions from "../../actions/GeneralActions";
import ViewProduct from "../../components/organisms/Products/viewProduct";
import Notification from "../../components/molecules/Notification/Notification";
import { withStyles } from "@material-ui/core";

class Inventory extends React.Component {
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

  closeNotification = () => {
    this.dispatch(actions.closeNotification());
  };

  listProducts = () => {
    const products = [];
    for (const product of this.props.products) {
      let characteristics = product.characteristics.map(characteristic => {
        return characteristic.value;
      });
      characteristics = characteristics.toString();
      characteristics = characteristics.replace(/,/gi, ", ");

      const dataProduct = {
        visibleData: [
          product.title,
          product.price.amount,
          product.description,
          characteristics,
          product.stock
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
      this.handleLoadProducts();
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
                  Todos los productos con bajo stock están listados aquí
                </p>
              </CardHeader>
              <CardBody>
                <ProductsTable
                  tableHeaderColor={"primary"}
                  tableHead={[
                    "Nombre",
                    "Precio",
                    "Descripción",
                    "Caracteristicas",
                    "Cantidad"
                  ]}
                  tableData={productsData}
                  getProductByUuid={actions.getProductsByUuid}
                  seeDetails={actions.seeDetails}
                  listProducts={actions.listProducts}
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
            {this.props.modalShow.viewModal ? (
              <ViewProduct
                closeModal={actions.closeModal}
                Transition={Transition}
                showNotification={generalActions.showNotification}
              />
            ) : null}
            <Notification closeNotification={this.closeNotification} />
          </GridItem>
        </GridContainer>
      </>
    );
  }
}

const mapStateToProps = state => {
  return state.productsReducer;
};

export default connect(mapStateToProps)(withStyles({})(Inventory));
