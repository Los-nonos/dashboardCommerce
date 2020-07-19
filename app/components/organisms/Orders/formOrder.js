import React from "react";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import GridContainer from "../../atoms/Grid/GridContainer";
import GridItem from "../../atoms/Grid/GridItem";
import CustomInput from "../../atoms/CustomInput/CustomInput";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core";
import styles from "../../../styles/dashboard/components/organisms/formProductStyles";

class FormOrder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAvailable: false,
      firstLoad: true
    };
    this.dispatch = props.dispatch;
  }

  toggleModal = async () => {
    await this.dispatch(this.props.closeModal());
  };

  searchCustomer = e => {
    e.preventDefault();

    this.dispatch(this.props.showSearchCustomerModal());
  };

  createOrder = e => {
    e.preventDefault();

    const fields = ["name", "numberSell"];

    const formElements = e.target.elements;

    const dataOrder = fields
      .map(field => ({
        [field]: formElements.namedItem(field).value
      }))
      .reduce((current, next) => ({ ...current, ...next }));

    dataOrder.customerId = this.props.formData.customer.id;
    dataOrder.employeeId = this.props.userData.id;

    if (this.props.modalShow.createModal) {
      this.dispatch(this.props.createOrder(dataOrder));
    }
  };

  handleSelectorChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  updateValues() {
    this.setState({
      firstLoad: false
    });
  }

  render() {
    const { classes, Transition } = this.props;

    if (this.props.modalShow.updateModal && this.state.firstLoad) {
      this.updateValues();
    }

    return (
      <Dialog
        classes={{
          root: classes.modalRoot,
          paper: classes.modal
        }}
        open={this.props.modalShow.createModal}
        className={{
          backgroundColor: "#090809"
        }}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="classic-modal-slide-title"
        aria-describedby="classic-modal-slide-description"
      >
        <DialogTitle
          id="classic-modal-slide-title"
          disableTypography
          className={classes.modalHeader}
        >
          {this.props.formData.name ? (
            <h4 className={classes.modalTitle}>{this.props.formData.name}</h4>
          ) : (
            <h4 className={classes.modalTitle}>{"Nueva Cliente"}</h4>
          )}
        </DialogTitle>
        <DialogContent
          id="classic-modal-slide-description"
          className={classes.modalBody}
        >
          <form onSubmit={this.createOrder}>
            <GridContainer>
              <GridItem xs={11} sm={11} md={4}>
                <CustomInput
                  labelText="Cliente"
                  id="name"
                  required
                  error={this.props.formErrors.customer !== undefined}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    required: true,
                    name: "customer",
                    defaultValue: this.props.formData.customer.name
                  }}
                />
                <CustomInput
                  labelText="Número de compra"
                  id="numberSell"
                  required
                  error={this.props.formErrors.numberSell !== undefined}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    required: true,
                    name: "numberSell",
                    defaultValue: this.props.formData.numberSell
                  }}
                />
              </GridItem>
              <GridItem xs={1} sm={1} md={1}>
                <Button onClick={this.searchCustomer} color={"primary"}>
                  Search
                </Button>
              </GridItem>
            </GridContainer>
            <div className={classes.customSubmitButton}>
              <Button
                type="submit"
                color="primary"
                loading={this.props.loading}
              >
                Ok
              </Button>
              <Button color="secondary" onClick={this.toggleModal}>
                Close
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
}

const mapStateToProps = state => {
  const { userData } = state.login;
  return { userData, ...state.ordersReducer };
};

export default connect(mapStateToProps)(withStyles(styles)(FormOrder));
