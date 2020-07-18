import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import GridContainer from "../../components/atoms/Grid/GridContainer";
import GridItem from "../../components/atoms/Grid/GridItem";
import Card from "../../components/molecules/Card/Card";
import CardHeader from "../../components/molecules/Card/CardHeader";
import CardBody from "../../components/molecules/Card/CardBody";
import * as actions from "../../actions/BrandsActions";
import Pagination from "../../components/molecules/Pagination/Pagination";
import * as generalActions from "../../actions/GeneralActions";
import Button from "@material-ui/core/Button";
import Notification from "../../components/molecules/Notification/Notification";
import Slide from "@material-ui/core/Slide";
import BrandsTable from "../../components/molecules/Tables/BrandsTable";
import FormBrands from "../../components/organisms/Brands/FormBrands";
import styles from "../../styles/dashboard/containers/Brands/BrandStyles";

class Brands extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1
    };
    this.dispatch = props.dispatch;
    this.handleLoadBrands();
  }

  handleLoadBrands = () => {
    this.dispatch(actions.checkRoles(["sales", "deposits"]));
    this.dispatch(actions.loadFilters());
    this.dispatch(
      actions.listBrands(this.state.page, this.state.orderBy, this.state.order)
    );
  };

  handleChangeOrderState = (orderBy, order) => {
    this.setState({ orderBy, order });
  };

  handleClickCreateBrands = () => {
    this.dispatch(actions.showCreateModal());
  };

  closeNotification = () => {
    this.dispatch(actions.closeNotification());
  };

  listBrands = () => {
    const brands = [];
    for (const brand of this.props.brands) {
      const dataBrand = {
        visibleData: [brand.name, brand.description],
        uuid: brand.uuid,
        id: brand.id
      };
      brands.push(dataBrand);
    }

    return brands;
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

    let brandsData = [];
    if (this.props.brands[0]) {
      brandsData = this.listBrands();
    }

    return (
      <>
        <GridContainer>
          <GridItem xs={12} md={12} sm={12}>
            <Card>
              <CardHeader color={"primary"}>
                <h4 className={classes.cardTitleWhite}>Marcas</h4>
                <p className={classes.cardCategoryWhite}>
                  Todas las marcas están listados aquí
                </p>
              </CardHeader>
              <CardBody>
                <BrandsTable
                  tableHeaderColor={"primary"}
                  tableHead={["Nombre", "Descripción"]}
                  tableData={brandsData}
                  getBrandById={actions.getBrandById}
                  listBrands={actions.listBrands}
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
              <FormBrands
                closeModal={actions.closeModal}
                deleteBrand={actions.deleteBrand}
                updateBrands={actions.updateBrands}
                createBrands={actions.createBrands}
                Transition={Transition}
                showNotification={generalActions.showNotification}
              />
            ) : null}
            <Button
              id={"createBrandButton"}
              color={"primary"}
              onClick={this.handleClickCreateBrands}
            >
              Cargar nueva marca
            </Button>
            <Notification closeNotification={this.closeNotification} />
          </GridItem>
        </GridContainer>
      </>
    );
  }
}

const mapStateToProps = state => {
  return state.brandsReducer;
};

export default connect(mapStateToProps)(withStyles(styles)(Brands));
