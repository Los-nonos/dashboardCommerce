import React from 'react';
import GridContainer from "../../atoms/Grid/GridContainer";
import GridItem from "../../atoms/Grid/GridItem";
import CustomInput from "../../atoms/CustomInput/CustomInput";
import CustomGridContainer from "../../atoms/Grid/CustomGridContainer";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

class FilterSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFilters: {
        categoryName: '',
      },
    };
  }

  searchProducts = () => {

  }

  lastSearch = () => {

  }

  handleCategoryName = () => {

  }

  listCategoryName = (classes) => {

  }

  render() {
    const { classes } = this.props;
    return (
      <>
        <CustomGridContainer>
          <GridItem>{this.lastSearch()}</GridItem>
        </CustomGridContainer>
        <GridContainer jusftify={'center'}>
          <GridItem lg={1} />
          <GridItem xs={12} sm={6} md={6} lg={2}>
            <FormControl fullWidth className={classes.selectFormControl}>
              <InputLabel htmlFor="category-name" className={classes.selectLabel}>
                Category name
              </InputLabel>
              <Select
                value={this.state.currentFilters.categoryName}
                onChange={this.handleCategoryName}
                MenuProps={{
                  className: classes.selectMenu,
                  classes: { paper: classes.selectPaper },
                }}
                classes={{ select: classes.select }}
                inputProps={{
                  name: 'categoryName',
                  id: 'category-name',
                }}
              >
                <MenuItem
                  disabled
                  classes={{
                    root: classes.selectMenuItem,
                  }}
                >
                  Category name
                </MenuItem>
                {this.listCategoryName(classes)}
              </Select>
            </FormControl>
          </GridItem>
          </GridContainer>
      </>
    );
  }
}

export default FilterSearch;