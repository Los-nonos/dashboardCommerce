import React from 'react';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import {Close, Done, Edit, Grade, Visibility} from "@material-ui/icons";

class EmployeeTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, tableHead, tableData, tableHeaderColor } = this.props;
    return (
      <div className={classes.tableResponsive}>
        <Table className={classes.table}>
          {tableHead !== undefined ? (
            <TableHead className={classes[tableHeaderColor + 'TableHeader']}>
              <TableRow>
                {tableHead.map((prop, key) => {
                  return (
                    <TableCell
                      className={classes.tableCell + ' ' + classes.tableHeadCell}
                      key={key}
                      onClick={this.handleOrderBy.bind(this, prop)}
                    >
                      {this.orderBySanitized(prop) != null ? this.changeArrowOrderBy(prop, classes) : null}
                      {prop}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
          ) : null}
          <TableBody>
            {tableData.length !== 0 && true
              ? tableData.map((prop, key) => {
                return (
                  <TableRow key={key}>
                    {prop.visibleData.map((prop, key) => {
                      return (
                        <TableCell className={classes.tableCell} key={key}>
                          {typeof prop === 'boolean' ? (
                            prop ? (
                              <CheckCircleOutlineIcon />
                            ) : (
                              <HighlightOffIcon />
                            )
                          ) : (
                            prop
                          )}
                        </TableCell>
                      );
                    })}
                    <TableCell className={classes.tableActions}>
                      <Tooltip
                        id="tooltip-top"
                        title="Ver detalles"
                        placement="top"
                        classes={{ tooltip: classes.tooltip }}
                      >
                        <IconButton
                          aria-label="See details"
                          className={classes.tableActionButton}
                          onClick={this.handleClickDetails.bind(this, prop)}
                        >
                          <Visibility className={classes.tableActionButtonIcon + ' ' + classes.edit} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip
                        id="tooltip-top-start"
                        title={'Eliminar'}
                        placement="top"
                        classes={{ tooltip: classes.tooltip }}
                      >
                        <IconButton
                          aria-label={prop.visibleData[9] === 'active' ? 'Close' : 'Done'}
                          className={classes.tableActionButton}
                          onClick={this.handleClickChangeState.bind(this, prop)}
                        >
                          {prop.visibleData[9] === 'active' ? (
                            <Close className={classes.tableActionButtonIcon + ' ' + classes.close} />
                          ) : (
                            <Done className={classes.tableActionButtonIcon + ' ' + classes.done} />
                          )}
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })
              : null}
          </TableBody>
        </Table>
      </div>
    );
  }
}