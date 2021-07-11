import { Box, Button, IconButton, Tooltip } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  MIN_UPLOADABLE_FILE_SIZE_IN_MBS,
  MAX_UPLOADABLE_FILE_SIZE_IN_MBS,
  SUPPORTED_FORMATS,
} from '../../utils/constants';
import { isFunction, Toast } from '../../utils/helper';

export function MuiFileInput({
  setImgFile,
  mutation,
  setFieldValue,
  name,
  acceptTypes,
  toolTipTitle,
  buttonText,
  btnIcon,
  variant,
  iconColor,
  fullWidth,
  size,
  isIcon,
  dimensionValidation,
  minimumDimensions,
  onFilechange,
}) {
  const inputEl = useRef(null);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    if (error) {
      Toast({
        icon: 'error',
        title: error,
      });
    }
  }, [error]);

  const handleCapture = ({ target }) => {
    const file = target?.files[0];
    const fileSizeInMB = file?.size / 1024 / 1024;
    if (file) {
      if (fileSizeInMB <= MIN_UPLOADABLE_FILE_SIZE_IN_MBS) {
        setError('Error: File is empty');
      } else if (fileSizeInMB >= MAX_UPLOADABLE_FILE_SIZE_IN_MBS) {
        setError('Error: File size too large');
      } else if (!SUPPORTED_FORMATS.includes(file?.type)) {
        setError('Error: Unsupported File Format');
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
          let fileObj = file;

          const image = new Image();
          image.src = window.URL.createObjectURL(file);
          let dimensionsValid = false;
          image.onload = () => {
            dimensionsValid =
              dimensionValidation &&
              (image?.height < minimumDimensions.height ||
                image?.width < minimumDimensions.width);
            if (dimensionsValid) {
              setError('Error: Minimum dimensions are 900 x 200');
            }
            fileObj = {
              height: image.height,
              width: image.width,
              file,
            };
            if (!dimensionsValid) {
              if (isFunction(setFieldValue)) setFieldValue(name, fileObj);
              if (isFunction(onFilechange)) onFilechange(fileObj);
              if (isFunction(setImgFile)) setImgFile(reader.result);
            }
          };
        };
        setError(null);
      }
    }
  };
  const handleClick = () => {
    inputEl.current.click();
  };

  return (
    <>
      <Box>
        <input
          id={name}
          type="file"
          onChange={handleCapture}
          hidden
          ref={inputEl}
          accept={acceptTypes}
        />
        <Tooltip title={toolTipTitle}>
          <label htmlFor={name}>
            {isIcon ? (
              <IconButton onClick={handleClick} disabled={mutation?.isLoading}>
                {btnIcon && btnIcon}
              </IconButton>
            ) : (
              <Button
                size={size}
                fullWidth={fullWidth}
                color={iconColor}
                onClick={handleClick}
                variant={variant}
                startIcon={btnIcon && btnIcon}
                disabled={mutation?.isLoading}
              >
                {buttonText}
              </Button>
            )}
          </label>
        </Tooltip>
      </Box>
    </>
  );
}

MuiFileInput.propTypes = {
  name: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool,
  variant: PropTypes.string,
  setImgFile: PropTypes.func,
  setFieldValue: PropTypes.func,
  acceptTypes: PropTypes.string,
  toolTipTitle: PropTypes.string,
  buttonText: PropTypes.string,
  size: PropTypes.string,
  dimensionValidation: PropTypes.bool,
  onFilechange: PropTypes.func,
  isIcon: PropTypes.bool,
  minimumDimensions: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
  }),
  iconColor: PropTypes.string,
};
MuiFileInput.defaultProps = {
  fullWidth: true,
  toolTipTitle: 'Select File',
  buttonText: 'Upload',
  variant: 'contained',
  iconColor: 'secondary',
  isIcon: false,
  dimensionValidation: false,
};
