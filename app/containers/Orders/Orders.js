import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/OrderActions";
import Slide from "@material-ui/core/Slide";
import GridContainer from "../../components/atoms/Grid/GridContainer";
import GridItem from "../../components/atoms/Grid/GridItem";
import Card from "../../components/molecules/Card/Card";
import CardHeader from "../../components/molecules/Card/CardHeader";
import CardBody from "../../components/molecules/Card/CardBody";
import OrdersTable from "../../components/molecules/Tables/OrdersTable";
import Pagination from "../../components/molecules/Pagination/Pagination";
import FormOrder from "../../components/organisms/Orders/formOrder";
import * as generalActions from "../../actions/GeneralActions";
import Button from "@material-ui/core/Button";
import Notification from "../../components/molecules/Notification/Notification";
import { withStyles } from "@material-ui/core";
import styles from "../../styles/dashboard/containers/Orders/OrdersStyles";

class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1
    };
    this.dispatch = props.dispatch;
    this.handleLoadOrders();
  }

  handleLoadOrders = () => {
    this.dispatch(actions.checkRoles(["admin", "sales"])); //TODO: verificar los roles en todas las vistas
    this.dispatch(
      actions.listOrders(this.state.page, this.state.orderBy, this.state.order)
    );
  };

  handleChangeOrderState = (orderBy, order) => {
    this.setState({ orderBy, order });
  };

  handleClickCreateOrder = () => {
    this.dispatch(actions.showCreateModal());
  };

  closeNotification = () => {
    this.dispatch(actions.closeNotification());
  };

  listOrders = () => {
    const orders = [];
    for (const order of this.props.orders) {
      let products = order.products.toString();
      products = products.replace(/,/gi, ", ");

      const dataOrder = {
        visibleData: [order.customer.name, order.numberSell, products],
        id: order.id
      };
      orders.push(dataOrder);
    }

    return orders;
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
      this.handleLoadOrders();
    }
    const { classes } = this.props;
    const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="down" ref={ref} {...props} />;
    });

    let ordersData = [];
    if (this.props.orders[0]) {
      ordersData = this.listOrders();
    }

    return (
      <>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color={"primary"}>
                <h4 className={classes.cardTitleWhite}>Órdenes</h4>
                <p className={classes.cardOrderWhite}>
                  Todas las ordenes están listados aquí
                </p>
              </CardHeader>
              <CardBody>
                <OrdersTable
                  tableHeaderColor={"primary"}
                  tableHead={["Nombre cliente", "Número de orden", "Productos"]}
                  tableData={ordersData}
                  getOrderById={actions.getOrderById}
                  completeOrder={actions.completeOrder}
                  listOrders={actions.listOrders}
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
            {this.props.modalShow.createModal ? (
              <FormOrder
                closeModal={actions.closeModal}
                createOrder={actions.createOrder}
                searchCustomer={actions.searchCustomer}
                Transition={Transition}
                showNotification={generalActions.showNotification}
              />
            ) : null}
            <Button
              id={"createOrderButton"}
              color={"primary"}
              onClick={this.handleClickCreateOrder}
            >
              Cargar nueva orden
            </Button>
            <Notification closeNotification={this.closeNotification} />
          </GridItem>
        </GridContainer>
      </>
    );
  }
}

const mapStateToProps = state => {
  return state.ordersReducer;
};

export default connect(mapStateToProps)(withStyles(styles)(Orders));
