import React from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import MUIRadio from '@material-ui/core/Radio';
import { FormControlLabel } from '@material-ui/core';
import { BodyTextSmall } from '../typography/index';
import { colors } from '../../theme/colors';

const FormikRadioGroup = ({
  field,
  form: { touched, errors },
  name,
  options,
  ...props
}) => {
  const fieldName = name || field.name;

  return (
    <>
      <RadioGroup row {...field} {...props} name={fieldName}>
        {options.map((option) => (
          <FormControlLabel
            control={<MUIRadio value={option.value} />}
            label={option.label}
          />
        ))}
      </RadioGroup>
      <BodyTextSmall style={{ color: colors.red }}>
        {touched[fieldName] && errors[fieldName] && <>{errors[fieldName]}</>}
      </BodyTextSmall>
    </>
  );
};

export default FormikRadioGroup;
