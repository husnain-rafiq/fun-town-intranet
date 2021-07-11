import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { useField, useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import { FormHelperText } from '@material-ui/core';
import { useStyles } from './style';
import { BodyTextLarge } from '../typography';

const MuiDatePicker = ({ label, inputVariant, format, ...props }) => {
  const classes = useStyles();
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        showTodayButton
        fullWidth
        format={format}
        inputVariant={inputVariant}
        KeyboardButtonProps={{ tabIndex: -1 }}
        label={<BodyTextLarge className={classes.label}>{label}</BodyTextLarge>}
        InputProps={{ className: classes.dateColor }}
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(val) => {
          setFieldValue(field.name, val);
        }}
      />
      {meta.touched && meta.error ? (
        <FormHelperText error>{meta.error}</FormHelperText>
      ) : null}
    </MuiPickersUtilsProvider>
  );
};
MuiDatePicker.propTypes = {
  label: PropTypes.string,
  inputVariant: PropTypes.string,
  format: PropTypes.string,
  margin: PropTypes.string,
};
MuiDatePicker.defaultProps = {
  inputVariant: 'outlined',
  format: 'MM/dd/yyyy',
};

export default MuiDatePicker;
