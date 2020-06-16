import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import LoadingButton from "../../atoms/CustomButtons/LoadingButton";
import Button from "@material-ui/core/Button";
import GridContainer from "../../atoms/Grid/GridContainer";
import GridItem from "../../atoms/Grid/GridItem";
import CustomInput from "../../atoms/CustomInput/CustomInput";
import CardAvatar from "../../molecules/Card/CardAvatar";
import CompleteProduct from "./CompleteProduct";
import {withStyles} from "@material-ui/core";
import styles from '../../../styles/dashboard/components/organisms/formProductStyles'
import productUploadImage from '../../../services/api/uploadImage';
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";


class FormProducts extends React.Component
{
  constructor(props) {
    super(props);

    this.state = {
      isAvailable: false,
      firstLoad: true,
      selectedImage: null,
    };
    this.dispatch = props.dispatch;
  }

  toggleModal = async () => {
    await this.dispatch(this.props.closeModal());
  };

  createProduct = (e) => {
    const fields = [
      'name',
      'description',
      'productImage'
    ];

    e.target.elements.namedItem('productImage').value = this.props.formData.productImage;

    const formElements = e.target.elements;
    const dataProducts = fields
      .map(field => ({
        [field]: formElements.namedItem(field).value,
      }))
      .reduce((current, next) => ({ ...current, ...next }));

    if (this.props.modalShow.createModal) {
      this.dispatch(this.props.createProduct(dataProducts));
    } else {
      dataProducts.id = this.props.formData.id;
      this.dispatch(this.props.updateProduct(dataProducts));
    }
  }

  handleSelectorChange = event => {
    if(event.target.name === 'category') {
      const category = this.props.filters.categoryName.map(categoryName => {
        if(categoryName.name === event.target.value) {
          return categoryName;
        }
      })
      this.dispatch(this.props.selectedCategory(category[0]));
    }
    this.setState({ [event.target.name]: event.target.value });
  };

  imageUploadHandler = async () => {
    const formDataImage = new FormData();
    const { selectedImage } = this.state;
    formDataImage.append('file', selectedImage, selectedImage.name);
    const imageResponse = await productUploadImage.imageUpload(formDataImage);
    this.props.formData.productImage = imageResponse.data.location;
    this.refreshImage();
    this.hiddenButtonUploadImage();
  };

  refreshImage = () => {
    document.getElementById('productImage').value = this.props.formData.productImage;
    document.getElementById('profileImageShow').src = this.props.formData.productImage;
  };

  showButtonUploadImage = () => {
    document.getElementById('uploadImageButton').style.display = 'inline-block';
  };

  hiddenButtonUploadImage = () => {
    document.getElementById('uploadImageButton').style.display = 'none';
  };

  checkIfUrlIsImage = url => {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  };

  imageSelectedHandler = event => {
    this.setState({
      selectedImage: event.target.files[0],
    });
    this.showButtonUploadImage();
  };

  updateValues() {
    this.setState({
      firstLoad: false,
      selectedImage: null,
    });
  }

  render() {
    const { classes, Transition } = this.props;
    const isImage = this.checkIfUrlIsImage(this.props.formData.productImage);
    this.props.formData.productImage = isImage ? this.props.formData.productImage : ''; // TODO: change from image product default

    if (this.props.modalShow.updateModal && this.state.firstLoad) {
      this.updateValues();
    }

    return (
      <Dialog
        classes={{
          root: classes.modalRoot,
          paper: classes.modal,
        }}
        open={
          this.props.modalShow.createModal || this.props.modalShow.updateModal
        }
        className={{
          backgroundColor: '#090809'
        }}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="classic-modal-slide-title"
        aria-describedby="classic-modal-slide-description"
      >
        <DialogTitle id="classic-modal-slide-title" disableTypography className={classes.modalHeader}>
          {this.props.formData.name !== '' ? (
            <h4 className={classes.modalTitle}>{this.props.formData.name}</h4>
          ) : null})}
        </DialogTitle>
        <DialogContent id="classic-modal-slide-description" className={classes.modalBody}>
          <form onSubmit={this.createProduct}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                  labelText="Name"
                  id="name"
                  required
                  error={this.props.formErrors.name !== undefined}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    required: true,
                    name: 'name',
                  }}
                />
                <CustomInput
                  labelText="Description"
                  id="description"
                  required
                  error={this.props.formErrors.description !== undefined}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    required: true,
                    name: 'description',
                    multiline: true,
                    rows: '5',
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                  labelText={'Price'}
                  id={'price'}
                  required
                  error={this.props.formErrors.price !== undefined}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    required: true,
                    name: 'price',
                    type: 'number',
                  }}
                />
                <CustomInput
                  labelText={'Taxes'}
                  id={'taxes'}
                  required
                  error={this.props.formErrors.price !== undefined}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    required: true,
                    name: 'taxes',
                    type: 'number'
                  }}
                />
                <FormControl fullWidth={true} className={{
                  color: '#fff',
                }}>
                  <InputLabel htmlFor="category" className={classes.selectLabel}>
                    Categoria
                  </InputLabel>
                  <Select
                    MenuProps={{
                      className: classes.selectMenu,
                    }}
                    classes={{
                      select: classes.select,
                    }}
                    required
                    error={this.props.formErrors.category !== undefined}
                    value={this.state.category}
                    onChange={this.handleSelectorChange}
                    inputProps={{
                      name: 'category',
                      id: 'category',
                    }}
                  >
                    <MenuItem
                      disabled
                      classes={{
                        root: classes.selectMenuItem,
                      }}
                    >
                      Categoria
                    </MenuItem>
                    {this.props.filters.categoryName.map(category => {
                      return (
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected,
                          }}
                          className={{
                            color: "#fff"
                          }}
                          value={category.name}
                        >
                          {category.name}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <CardAvatar product>
                  <img
                    id="productImageShow"
                    alt={'productImageShow'}
                    src={this.props.formData.productImage}
                    className={`${classes.customAvatarPlaceholder}`}
                  />
                </CardAvatar>
                <input
                  onChange={this.imageSelectedHandler}
                  accept="image/*"
                  className={classes.input}
                  style={{ display: 'none' }}
                  id="raised-button-file"
                  multiple
                  type="file"
                />
                <label htmlFor="raised-button-file">
                  <Button variant="raised" component="span" size="sm" className={classes.button}>
                    Upload Image
                  </Button>
                </label>
                <Button
                  id="uploadImageButton"
                  onClick={this.imageUploadHandler}
                  color="primary"
                  variant="raised"
                  component="span"
                  className={classes.button}
                  style={{ display: 'none' }}
                  size="sm"
                >
                  Apply
                </Button>
                <CustomInput
                  id="productImage"
                  error={this.props.formErrors.productImage !== undefined}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    required: false,
                    defaultValue: this.props.formData.productImage,
                    name: 'productImage',
                    type: 'hidden',
                  }}
                />
              </GridItem>
            </GridContainer>
            <GridContainer>
              <CompleteProduct
                productsUpdated={this.props.productsUpdated}
                changeTabSelected={this.props.changeTabSelected}
                showNotification={this.props.showNotification}
                assignCharacteristicToProduct={this.props.assignCharacteristicToProduct}
              />
            </GridContainer>
            <div className={classes.customSubmitButton}>
              <LoadingButton type="submit" color="primary" loading={this.props.loading}>
                Ok
              </LoadingButton>
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

FormProducts.propTypes = {
  classes: PropTypes.object.isRequired,

  name: PropTypes.string,
  description: PropTypes.string,
  productImage: PropTypes.string,
  price: PropTypes.string,

  modalShow: PropTypes.object,
  dispatch: PropTypes.func,
  closeModal: PropTypes.func,
  showProfileModal: PropTypes.func,
  createProduct: PropTypes.func,
  updateProduct: PropTypes.func,
  imageUpload: PropTypes.func,
  error: PropTypes.object,
  formData: PropTypes.object,
  formErrors: PropTypes.object,
  loadingToggle: PropTypes.func,
  assignCharacteristicToProduct: PropTypes.func,
  selectedCategory: PropTypes.func,

  productProfileUpdated: PropTypes.func,
  showNotification: PropTypes.func,
};

const mapStateToProps = state => {
  return state.productsReducer;
}

export default connect(mapStateToProps)(withStyles(styles)(FormProducts));