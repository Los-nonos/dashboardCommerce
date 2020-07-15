import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/EmployeeActions";
import GridItem from "../../components/atoms/Grid/GridItem";
import Card from "../../components/molecules/Card/Card";
import CardHeader from "../../components/molecules/Card/CardHeader";
import CardBody from "../../components/molecules/Card/CardBody";
import Pagination from "../../components/molecules/Pagination/Pagination";
import GridContainer from "../../components/atoms/Grid/GridContainer";
import EmployeeTable from "../../components/molecules/Tables/EmployeeTable";
import { withStyles } from "@material-ui/core";
import styles from "../../styles/dashboard/containers/Products/ProductContainerStyles";
import FormProducts from "../../components/organisms/Products/formProducts";
import * as generalActions from "../../actions/GeneralActions";
import ViewProduct from "../../components/organisms/Products/viewProduct";
import Button from "@material-ui/core/Button";
import Notification from "../../components/molecules/Notification/Notification";
import Slide from "@material-ui/core/Slide";
import FormEmployee from "../../components/organisms/Employees/formEmployees";

class Employees extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      order: 'asc',
      orderBy: 'name',
    }
    this.dispatch = props.dispatch;
    this.handleLoadEmployees();
  }

  handleClickCreateEmployee = () => {
    this.dispatch(actions.showCreateModal());
  }

  handleLoadEmployees = () => {
    this.dispatch(actions.checkRoles(["admin"]));
    this.dispatch(
      actions.listEmployees(
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

  listEmployee = () => {
    const employees = [];
    for (const employee of this.props.employees) {
      let listRoles = employee.roles.toString();
      listRoles = listRoles.replace(/,/gi, ", ");

      const dataEmployee = {
        visibleData: [
          employee.name,
          employee.surname,
          listRoles
        ],
        id: employee.id
      };
      employees.push(dataEmployee);
    }

    return employees;
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
    let employeeData = [];

    if (this.state.page !== this.props.page) {
      this.setState({ page: this.props.page });
      this.handleLoadEmployees();
    }
    const { classes } = this.props;
    const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="down" ref={ref} {...props} />;
    });

    if (this.props.employees[0]) {
      employeeData = this.listEmployee();
    }

    return (
      <>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color={"primary"}>
                <h4 className={classes.cardTitleWhite}>Empleados</h4>
                <p className={classes.cardCategoryWhite}>
                  Todos los empleados están listados aquí
                </p>
              </CardHeader>
              <CardBody>
                <EmployeeTable
                  tableHeaderColor={"primary"}
                  tableHead={["Nombre", "Apellido", "Rol"]}
                  tableData={employeeData}
                  getEmployeeById={actions.getEmployeeById}
                  completeEmployee={actions.completeEmployee}
                  seeDetails={actions.seeDetails}
                  listEmployees={actions.listEmployees}
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
              <FormEmployee
                closeModal={actions.closeModal}
                updateEmployee={actions.updateEmployee}
                createEmployee={actions.createEmployee}
                Transition={Transition}
                employeeUpdated={actions.employeeUpdated}
                showNotification={generalActions.showNotification}
              />
            ) : null}
            <Button
              id={"createEmployeeButton"}
              color={"primary"}
              onClick={this.handleClickCreateEmployee}
            >
              Cargar nuevo empleado
            </Button>
            <Notification closeNotification={this.closeNotification} />
          </GridItem>
        </GridContainer>
      </>
    );
  }
}

const mapStateToProps = state => {
  return state.employeeReducer;
};

export default connect(mapStateToProps)(withStyles(styles)(Employees));
