import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/CustomerActions";
import Slide from "@material-ui/core/Slide";
import GridContainer from "../../components/atoms/Grid/GridContainer";
import GridItem from "../../components/atoms/Grid/GridItem";
import Card from "../../components/molecules/Card/Card";
import CardHeader from "../../components/molecules/Card/CardHeader";
import CardBody from "../../components/molecules/Card/CardBody";
import CustomerTable from "../../components/molecules/Tables/CustomerTable";
import Pagination from "../../components/molecules/Pagination/Pagination";
import FormCustomers from "../../components/organisms/Customers/formCustomers";
import * as generalActions from "../../actions/GeneralActions";
import Button from "@material-ui/core/Button";
import Notification from "../../components/molecules/Notification/Notification";
import { withStyles } from "@material-ui/core";
import styles from "../../styles/dashboard/containers/Customers/CustomersStyles";

class Customers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1
    };
    this.dispatch = props.dispatch;
    this.handleLoadCustomers();
  }

  handleLoadCustomers = () => {
    this.dispatch(actions.checkRoles(["admin", "sales"]));
    this.dispatch(
      actions.listCustomers(
        this.state.page,
        this.state.orderBy,
        this.state.order
      )
    );
  };

  handleChangeOrderState = (orderBy, order) => {
    this.setState({ orderBy, order });
  };

  handleClickCreateCustomer = () => {
    this.dispatch(actions.showCreateModal());
  };

  closeNotification = () => {
    this.dispatch(actions.closeNotification());
  };

  listCustomers = () => {
    const customers = [];
    for (const customer of this.props.customers) {
      const dataCustomer = {
        visibleData: [customer.name, customer.surname, customer.dni],
        id: customer.id
      };
      customers.push(dataCustomer);
    }

    return customers;
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
      this.handleLoadCustomers();
    }
    const { classes } = this.props;
    const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="down" ref={ref} {...props} />;
    });

    let customersData = [];
    if (this.props.customers[0]) {
      customersData = this.listCustomers();
    }

    return (
      <>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color={"primary"}>
                <h4 className={classes.cardTitleWhite}>Clientes</h4>
                <p className={classes.cardCategoryWhite}>
                  Todos los clientes están listados aquí
                </p>
              </CardHeader>
              <CardBody>
                <CustomerTable
                  tableHeaderColor={"primary"}
                  tableHead={["Nombre", "Apellido", "D.N.I."]}
                  tableData={customersData}
                  getCustomerById={actions.getCustomerById}
                  completeCustomer={actions.completeCustomer}
                  deleteCustomer={actions.deleteCustomer}
                  showUpdateModal={actions.showUpdateModal}
                  listCustomer={actions.listCustomers}
                  changeOrderState={this.handleChangeOrderState}
                  page={this.state.page}
                  selectUser={false}
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
              <FormCustomers
                closeModal={actions.closeModal}
                updateCustomer={actions.updateCustomer}
                createCustomer={actions.createCustomer}
                Transition={Transition}
                showNotification={generalActions.showNotification}
              />
            ) : null}
            <Button
              id={"createCustomerButton"}
              color={"primary"}
              onClick={this.handleClickCreateCustomer}
            >
              Cargar nuevo cliente
            </Button>
            <Notification closeNotification={this.closeNotification} />
          </GridItem>
        </GridContainer>
      </>
    );
  }
}

const mapStateToProps = state => {
  return state.customerReducer;
};

export default connect(mapStateToProps)(withStyles(styles)(Customers));
