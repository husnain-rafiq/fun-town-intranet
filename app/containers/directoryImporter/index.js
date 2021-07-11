/**
 *
 * DirectoryUploader
 *
 */

import React, { memo, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import { uploadEmployeeFile } from 'state/queryFunctions';
import { WrapInCard } from 'components';
import { Box } from '@material-ui/core';
import EmployeeFileUploader from '../../components/pages/directoryImporter';
import WrapInBreadcrumbs from '../../components/layout/wrapInBreadcrumbs';
import { navigateTo, Toast } from '../../utils/helper';

function DirectoryUploader() {
  const history = useHistory();
  const mutation = useMutation(uploadEmployeeFile, {
    onError: ({
      response: {
        data: { message },
      },
    }) => {
      Toast({
        icon: 'error',
        title: message || 'Some error occured',
      });
    },
  });

  useEffect(() => {
    if (mutation.isSuccess) {
      Toast({
        icon: 'success',
        title: message || 'File Uploaded Successfully',
      });

      setSelectedFile(null);
      navigateTo(history, '/directory');
    }
  }, [mutation.isSuccess]);
  const { data: { data: { data: { message } = {} } = {} } = {} } = mutation;
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const inputEl = React.useRef(null);

  const handleCapture = ({ target }) => {
    if (target.files[0]) {
      if (target.files[0].size / 1024 / 1024 <= 0) {
        setError('Error: File is empty');
      } else if (target.files[0].size / 1024 / 1024 >= 10) {
        setError('Error: File size too large');
      } else {
        setSelectedFile(target.files[0]);
        setError(null);
      }
    }
  };
  const handleClick = () => {
    inputEl.current.click();
  };
  const handleSubmit = () => {
    const dataFile = new FormData();
    dataFile.append('file', selectedFile);
    mutation.mutate(dataFile);
  };

  const handleTemplateDownload = () => {
    const response = {
      file: `${process.env.API_ASSETS_URL}employee-list-template.xlsx`,
    };
    window.open(response.file, '_self');
  };

  return (
    <>
      <Helmet>
        <title>Directory Uploader</title>
        <meta
          name="ftrv directory uploader"
          content="ftrv - Upload directory file"
        />
      </Helmet>

      <WrapInBreadcrumbs>
        <WrapInCard>
          <Box m={3}>
            <EmployeeFileUploader
              handleCapture={handleCapture}
              handleClick={handleClick}
              handleSubmit={handleSubmit}
              handleTemplateDownload={handleTemplateDownload}
              mutation={mutation}
              error={error}
              selectedFile={selectedFile}
              inputEl={inputEl}
            />
          </Box>
        </WrapInCard>
      </WrapInBreadcrumbs>
    </>
  );
}

export default memo(DirectoryUploader);
