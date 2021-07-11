import React, { memo } from 'react';
import {
  Box,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FolderOpenOutlinedIcon from '@material-ui/icons/FolderOpenOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import { BodyTextSmall, BodyTextLarge } from '../typography';
import { colors } from '../../theme/colors';
import { useAuthContext } from '../../context/authContext';
import { ROLES } from '../../utils/constants';
import { navigateTo } from '../../utils/helper';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    marginBottom: theme.spacing(1),
    borderRadius: '20px',
  },
  folderIcon: {
    fontSize: '70px',
    color: colors.grey,
    cursor: 'pointer',
  },
  menuCursor: {
    cursor: 'pointer',
  },
}));
export function Category({ id, name, linksCount, handleDeleteCategory }) {
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDeleteCategoryWithMenu = (categoryId, usefulLinksCount) => {
    setAnchorEl(null);
    handleDeleteCategory(categoryId, usefulLinksCount);
  };
  const {
    user: {
      data: { role },
    },
  } = useAuthContext();

  const StyledMenu = withStyles({
    paper: {
      border: `1px solid ${colors.grey}`,
    },
  })((props) => (
    <Menu
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));

  return (
    <Box width={1}>
      <Paper elevation={3} className={classes.paper}>
        {role === ROLES.ADMIN && (
          <Box>
            <Box mt={2} display="flex" justifyContent="flex-end">
              <MoreVertOutlinedIcon
                className={classes.menuCursor}
                onClick={handleClick}
              />
            </Box>
            <StyledMenu
              id="customized-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() =>
                  navigateTo(history, `/link-categories/edit/${id}`)
                }
              >
                <ListItemIcon>
                  <EditOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Edit" />
              </MenuItem>
              <MenuItem
                onClick={() => handleDeleteCategoryWithMenu(id, linksCount)}
              >
                <ListItemIcon>
                  <DeleteForeverOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Delete" />
              </MenuItem>
            </StyledMenu>
          </Box>
        )}
        <FolderOpenOutlinedIcon
          className={classes.folderIcon}
          onClick={() =>
            navigateTo(history, `/link-categories/useful-links/${id}`)
          }
        />
        <Box mt={2}>
          <BodyTextLarge
            color="secondary"
            fontWeight="fontWeightMedium"
            className={classes.menuCursor}
            onClick={() =>
              navigateTo(history, `/link-categories/useful-links/${id}`)
            }
          >
            {name}
          </BodyTextLarge>
        </Box>
        <Box mb={5} mt={1}>
          <BodyTextSmall
            color="secondary"
            className={classes.menuCursor}
            onClick={() =>
              navigateTo(history, `/link-categories/useful-links/${id}`)
            }
          >
            {`${linksCount} link(s)`}
          </BodyTextSmall>
        </Box>
      </Paper>
    </Box>
  );
}
Category.propTypes = {
  name: PropTypes.string,
  linksCount: PropTypes.string,
};

export default memo(Category);
