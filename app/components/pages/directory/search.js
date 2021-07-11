import React, { memo } from 'react';
import Box from '@material-ui/core/Box';
import SearchIcon from '@material-ui/icons/Search';
import { FormControlLabel, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import { Form, Formik } from 'formik';
import { Input } from '../../index';
import { H5 } from '../../typography';

const useStyles = makeStyles((theme) => ({
  gridpadding: {
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(5, 0, 10, 0),
    },
  },
}));
export function Search({
  initialValues,
  onHandleSwitchChange,
  checked,
  onHandleSearch,
}) {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={12} sm={3} md={2} className={classes.gridpadding}>
        <H5>Directory</H5>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Formik initialValues={initialValues}>
          {({ handleChange, setFieldValue }) => (
            <Form>
              <Input
                name="searchString"
                variant="outlined"
                prependIcon
                Icon={SearchIcon}
                OutlinedInputPlaceholder="Type here to search"
                margin="dense"
                IconClickable={false}
                onChange={(e) => {
                  onHandleSearch(e, setFieldValue);
                  handleChange(e);
                }}
                disabled={checked && true}
                showInputLabel={false}
              />
            </Form>
          )}
        </Formik>
      </Grid>
      <Grid item xs={12} sm={4} md={3} lg={2}>
        <Box px={[0, 5]}>
          <FormControlLabel
            label="Filter"
            control={
              <Switch
                checked={checked}
                onChange={onHandleSwitchChange}
                name="filter"
                color="primary"
              />
            }
          />
        </Box>
      </Grid>
    </Grid>
  );
}

export default memo(Search);
