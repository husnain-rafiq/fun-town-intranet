import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Box } from '@material-ui/core';
import { StyledTableSortLabel } from './styles';
import { CheckBox } from '../index';
import { ROLES } from '../../utils/constants';

export default function EnhancedTableHead({
  classes,
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
  headCells,
  role,
  rows,
  currentUserID,
  matchUserIdWithIDS,
}) {
  const [usersCount, setUsersCount] = useState(false);
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  useEffect(() => {
    setUsersCount(rows.filter((row) => row.id !== currentUserID).length);
  }, [rows]);
  return (
    <TableHead className={classes.tableHead}>
      <TableRow>
        {role === ROLES.ADMIN && (
          <TableCell padding="checkbox">
            <CheckBox
              indeterminate={numSelected > 0 && numSelected < usersCount}
              checked={
                matchUserIdWithIDS
                  ? usersCount > 0 && numSelected === usersCount
                  : rowCount > 0 && numSelected === rowCount
              }
              onChange={onSelectAllClick}
              className={classes.tableHead}
            />
          </TableCell>
        )}

        {headCells.map((headCell) => (
          <TableCell
            align={headCell.numeric ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
            className={classes.headCells}
          >
            {headCell.numeric ? (
              <Box className={classes.headLabel}>{headCell.label}</Box>
            ) : (
              <StyledTableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                <Box className={classes.headLabel}>{headCell.label}</Box>
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </span>
                ) : null}
              </StyledTableSortLabel>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  headCells: PropTypes.array.isRequired,
};
EnhancedTableHead.defaultProps = {};
