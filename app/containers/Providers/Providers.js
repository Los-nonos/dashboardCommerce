import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";

import * as actions from "../../actions/ProviderActions";
import Slide from "@material-ui/core/Slide";
import GridContainer from "../../components/atoms/Grid/GridContainer";
import GridItem from "../../components/atoms/Grid/GridItem";
import Card from "../../components/molecules/Card/Card";
import CardHeader from "../../components/molecules/Card/CardHeader";
import CardBody from "../../components/molecules/Card/CardBody";
import ProvidersTable from "../../components/molecules/Tables/ProvidersTable";
import Pagination from "../../components/molecules/Pagination/Pagination";
import FormProvider from "../../components/organisms/Providers/formProvider";
import * as generalActions from "../../actions/GeneralActions";
import Button from "@material-ui/core/Button";
import Notification from "../../components/molecules/Notification/Notification";

import styles from "../../styles/dashboard/containers/Orders/OrdersStyles";

class Providers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1
    };
    this.dispatch = props.dispatch;
    this.handleLoadProviders();
  }

  handleLoadProviders = () => {
    this.dispatch(actions.checkRoles(["admin", "sales"])); //TODO: verificar los roles en todas las vistas
    this.dispatch(
      actions.listProviders(
        this.state.page,
        this.state.orderBy,
        this.state.order
      )
    );
  };

  handleChangeOrderState = (orderBy, order) => {
    this.setState({ orderBy, order });
  };

  handleClickCreateProvider = () => {
    this.dispatch(actions.showCreateModal());
  };

  closeNotification = () => {
    this.dispatch(actions.closeNotification());
  };

  listProviders = () => {
    const providers = [];
    for (const provider of this.props.providers) {
      const dataProvider = {
        visibleData: [provider.name, provider.direction],
        id: provider.id
      };
      providers.push(dataProvider);
    }

    return providers;
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
      this.handleLoadProviders();
    }
    const { classes } = this.props;
    const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="down" ref={ref} {...props} />;
    });

    let providersData = [];
    if (this.props.providers[0]) {
      providersData = this.listProviders();
    }

    return (
      <>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color={"primary"}>
                <h4 className={classes.cardTitleWhite}>Proveedores</h4>
                <p className={classes.cardProviderWhite}>
                  Todos los proveedores están listados aquí
                </p>
              </CardHeader>
              <CardBody>
                <ProvidersTable
                  tableHeaderColor={"primary"}
                  tableHead={["Nombre proveedor", "direccion"]}
                  tableData={providersData}
                  getProviderById={actions.getProviderById}
                  deleteProvider={actions.deleteProvider}
                  completeProvider={actions.completeProvider}
                  listProviders={actions.listProviders}
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
              <FormProvider
                closeModal={actions.closeModal}
                createProvider={actions.createProvider}
                updateProvider={actions.updateProvider}
                Transition={Transition}
                showNotification={generalActions.showNotification}
              />
            ) : null}
            <Button
              id={"createProviderButton"}
              color={"primary"}
              onClick={this.handleClickCreateProvider}
            >
              Cargar nuevo proveedor
            </Button>
            <Notification closeNotification={this.closeNotification} />
          </GridItem>
        </GridContainer>
      </>
    );
  }
}

const mapStateToProps = state => {
  return state.providersReducer;
};

export default connect(mapStateToProps)(withStyles(styles)(Providers));
