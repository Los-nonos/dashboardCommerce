import React from "react";
import { connect } from "react-redux";
import styles from "../../styles/dashboard/containers/Categories/CategoryStyles";
import * as actions from "../../actions/CategoryActions";
import Slide from "@material-ui/core/Slide";
import GridContainer from "../../components/atoms/Grid/GridContainer";
import GridItem from "../../components/atoms/Grid/GridItem";
import Card from "../../components/molecules/Card/Card";
import CardHeader from "../../components/molecules/Card/CardHeader";
import CardBody from "../../components/molecules/Card/CardBody";
import CategoryTable from "../../components/molecules/Tables/CategoryTable";
import Pagination from "../../components/molecules/Pagination/Pagination";
import FormCategories from "../../components/organisms/Products/formCategories";
import * as generalActions from "../../actions/GeneralActions";
import Button from "@material-ui/core/Button";
import Notification from "../../components/molecules/Notification/Notification";
import { withStyles } from "@material-ui/core";

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1
    };
    this.dispatch = props.dispatch;
    this.handleLoadCategories();
  }

  handleLoadCategories = () => {
    this.dispatch(actions.checkRoles(["admin", "deposits"]));
    this.dispatch(
      actions.listCategories(
        this.state.page,
        this.state.orderBy,
        this.state.order
      )
    );
  };

  handleChangeOrderState = (orderBy, order) => {
    this.setState({ orderBy, order });
  };

  handleClickCreateCategories = () => {
    this.dispatch(actions.showCreateModal());
  };

  closeNotification = () => {
    this.dispatch(actions.closeNotification());
  };

  listCategories = () => {
    const categories = [];
    for (const category of this.props.categories) {
      const dataCategory = {
        visibleData: [category.name],
        id: category.id
      };
      categories.push(dataCategory);
    }

    return categories;
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
      this.handleLoadCategories();
    }
    const { classes } = this.props;
    const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="down" ref={ref} {...props} />;
    });

    let categoriesData = [];
    if (this.props.categories[0]) {
      categoriesData = this.listCategories();
    }

    return (
      <>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color={"primary"}>
                <h4 className={classes.cardTitleWhite}>Categorias</h4>
                <p className={classes.cardCategoryWhite}>
                  Todas las categorias están listados aquí
                </p>
              </CardHeader>
              <CardBody>
                <CategoryTable
                  tableHeaderColor={"primary"}
                  tableHead={["Nombre"]}
                  tableData={categoriesData}
                  getCategoriesById={actions.getCategoryById}
                  completeCategory={actions.completeCategory}
                  showUpdateModal={actions.showUpdateModal}
                  listCategories={actions.listCategories}
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
              <FormCategories
                closeModal={actions.closeModal}
                updateCategory={actions.updateCategory}
                createCategory={actions.createCategory}
                Transition={Transition}
                categoriesUpdated={actions.categoriesUpdated}
                showNotification={generalActions.showNotification}
              />
            ) : null}
            <Button
              id={"createCategoryButton"}
              color={"primary"}
              onClick={this.handleClickCreateCategories}
            >
              Cargar nueva categoria
            </Button>
            <Notification closeNotification={this.closeNotification} />
          </GridItem>
        </GridContainer>
      </>
    );
  }
}

const mapStateToProps = state => {
  return state.categoriesReducer;
};

export default connect(mapStateToProps)(withStyles(styles)(Categories));
