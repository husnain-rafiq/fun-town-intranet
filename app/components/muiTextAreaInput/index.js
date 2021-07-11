/**
 *
 * TextArea
 *
 */

import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useField } from 'formik';
import PropTypes from 'prop-types';
import React, { memo } from 'react';

const useStyles = makeStyles((theme) => ({
  label: {
    color: theme.palette.text.info,
  },
  inputColor: {
    color: theme.palette.text.dark,
  },
}));

function TextArea({
  inputType,
  inputID,
  isDisabled,
  fullWidth,
  variant,
  formControlProps,
  OutlinedInputPlaceholder,
  showInputLabel,
  rows,
  rowsMax,
  multiline,
  ...props
}) {
  const [field, meta] = useField(props);
  const classes = useStyles();
  return (
    <FormControl
      fullWidth={fullWidth}
      error={meta.touched && meta.error}
      {...formControlProps}
      variant={variant}
    >
      <>
        {showInputLabel && (
          <InputLabel htmlFor={inputID} className={classes.label}>
            {OutlinedInputPlaceholder}
          </InputLabel>
        )}
        <OutlinedInput
          label={showInputLabel ? OutlinedInputPlaceholder : undefined}
          id={inputID}
          type={inputType}
          disabled={isDisabled}
          classes={{ input: classes.inputColor }}
          placeholder={
            !showInputLabel &&
            OutlinedInputPlaceholder &&
            OutlinedInputPlaceholder
          }
          rows={rows}
          rowsMax={rowsMax}
          multiline={multiline}
          {...field}
          {...props}
        />
      </>

      {meta.touched && meta.error ? (
        <FormHelperText error>{meta.error}</FormHelperText>
      ) : null}
    </FormControl>
  );
}

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool,
  isDisabled: PropTypes.bool,
  inputType: PropTypes.string,
  inputID: PropTypes.string,
  variant: PropTypes.string,
  formControlProps: PropTypes.object,
  OutlinedInputPlaceholder: PropTypes.string,
  showInputLabel: PropTypes.bool,
  rows: PropTypes.number,
  rowsMax: PropTypes.number,
  multiline: PropTypes.bool,
};
TextArea.defaultProps = {
  showInputLabel: true,
  variant: 'outlined',
  OutlinedInputPlaceholder: 'Description',
  rows: 4,
  rowsMax: 10,
  fullWidth: true,
  multiline: true,
};

export default memo(TextArea);

// Usage

/* <TextArea
name="description"
OutlinedInputPlaceholder="Search"
Icon={EmailIcon}
inputType="text"
onInputChange={handleChange}
inputID="abc"
Icon={EmailIcon}
formControlProps={{ fullWidth: true }}   
...otherProps
/>; */
