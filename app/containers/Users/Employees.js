import React from 'react';
import * as actions from "../../actions/EmployeeActions";
import GridItem from "../../components/atoms/Grid/GridItem";
import Card from "../../components/molecules/Card/Card";
import CardHeader from "../../components/molecules/Card/CardHeader";
import CardBody from "../../components/molecules/Card/CardBody";
import ProductsTable from "../../components/molecules/Tables/ProductsTable";
import Pagination from "../../components/molecules/Pagination/Pagination";
import GridContainer from "../../components/atoms/Grid/GridContainer";
import Slide from "@material-ui/core/Slide";

class Employees extends React.Component {
  constructor(props) {
    super(props);
    this.dispatch = props.dispatch;
    this.handleLoadEmployees();
  }

  handleLoadEmployees = () => {
    this.dispatch(actions.checkRoles(['admin']));
    this.dispatch(actions.listEmployees(this.state.page, this.state.orderBy, this.state.order));
  }

  handleChangeOrderState = (orderBy, order) => {
    this.setState({ orderBy, order });
  };

  handleClickCreateProducts = () => {
    this.dispatch(actions.showCreateModal());
  }

  closeNotification = () => {
    this.dispatch(actions.closeNotification());
  }

  listEmployee = () => {
    const employees = [];
    for(const employee of this.props.employees) {
      const dataEmployee = {
        visibleData: [
          employee.name,
          employee.surname,
          employee.role,
        ],
        id: employee.id,
      }
      employees.push(dataEmployee);
    }

    return employees;
  }


  pagination = () => {
    const pages = [
      {
        text: 'PREV',
        onClick: () => {
          this.dispatch(actions.previousPage());
        },
      },
    ];
    for (let index = 1; index <= this.props.totalPages; index++) {
      if (index === this.props.page) {
        pages.push({ text: index, active: true });
      } else {
        pages.push({
          text: index,
          onClick: () => {
            this.dispatch(actions.selectPage(index));
          },
        });
      }
    }
    pages.push({
      text: 'NEXT',
      onClick: () => {
        this.dispatch(actions.nextPage());
      },
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

    if(this.props.employees[0]) {
      employeeData = this.listEmployee();
    }

    return (
      <>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color={'primary'}>
                <h4 className={classes.cardTitleWhite}>Empleados</h4>
                <p className={classes.cardCategoryWhite}>Todos los empleados están listados aquí</p>
              </CardHeader>
              <CardBody>
                <EmployeeTable
                  tableHeaderColor={'primary'}
                  tableHead={[
                    'Nombre',
                    'Apellido',
                    'Rol'
                  ]}
                  tableData={employeeData}
                  getProductByUuid={actions.getEmployeeByid}
                  completeProduct={actions.completeEmployee}
                  seeDetails={actions.seeDetails}
                  listProducts={actions.listEmployees}
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
      </>
    );
  }
}