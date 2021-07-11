import React, { memo, useState } from 'react';
import { Avatar, Box, Button, FormHelperText } from '@material-ui/core';
import { Input } from 'components';
import { Add } from '@material-ui/icons';
import ClearIcon from '@material-ui/icons/Clear';
import { MuiFileInput } from 'components/muiFileInput';
import { Form, Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import { FILE_ACCEPT_TYPES } from 'utils/constants';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import TitleOutlinedIcon from '@material-ui/icons/TitleOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PropTypes from 'prop-types';
import ImageRoundedIcon from '@material-ui/icons/ImageRounded';
import ClassicEditor from '../../ckeditor5/build/ckeditor';
import WrapInCard from '../../layout/wrapInCard';
import WrapInBreadcrumbs from '../../layout/wrapInBreadcrumbs';
import { H4 } from '../../typography';
import { blogSchema } from './blogSchema';
import { useStyles } from './style';
import { navigateTo } from '../../../utils/helper';

function CreateBlog({ onHandleSubmit, id, initialValues }) {
  const imgURL = initialValues?.file;
  const [imgFile, setImgFile] = useState(imgURL);
  const history = useHistory();
  const classes = useStyles();
  const customConfig = {
    placeholder: 'Start by typing content here!',
    toolbar: {
      items: [
        'heading',
        '|',
        'bold',
        'italic',
        'link',
        'bulletedList',
        'numberedList',
        '|',
        'outdent',
        'indent',
        '|',
        'imageUpload',
        'blockQuote',
        'insertTable',
        'mediaEmbed',
        'undo',
        'redo',
      ],
    },
    image: {
      toolbar: ['imageTextAlternative', 'imageStyle:full', 'imageStyle:side'],
    },
    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
    },
    mediaEmbed: {
      previewsInData: true,
    },
  };
  return (
    <>
      <WrapInBreadcrumbs>
        <WrapInCard mb={8}>
          <Formik
            initialValues={initialValues}
            validationSchema={blogSchema}
            onSubmit={onHandleSubmit}
          >
            {({ setFieldValue, errors, touched, values }) => (
              <Form>
                <Box
                  flexWrap="wrap"
                  flexDirection="row"
                  p={[0, 0, 0, 4]}
                  pr={[0, 0, 0, 36]}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box
                    width={[1, 1, 1, '30%']}
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Box width={1} display="flex" justifyContent="center">
                      <Box
                        width={[1 / 2, 1]}
                        display="flex"
                        justifyContent="center"
                      >
                        {imgFile ? (
                          <Avatar
                            src={imgFile}
                            className={classes.imageStyle}
                          />
                        ) : (
                          <ImageRoundedIcon
                            style={{ fontSize: '160px', borderRadius: '100%' }}
                            color="disabled"
                          />
                        )}
                      </Box>
                    </Box>
                    <Box ml={1} pt={5} display="flex" justifyContent="center">
                      <MuiFileInput
                        name="file"
                        setImgFile={setImgFile}
                        setFieldValue={setFieldValue}
                        acceptTypes={FILE_ACCEPT_TYPES.imageFiles}
                        toolTipTitle="Select thumbnail"
                        buttonText={
                          id ? 'Update thumbnail' : 'Upload thumbnail'
                        }
                        btnIcon={<Add />}
                      />
                    </Box>
                  </Box>
                  <Box width={[1, 1, 1, '70%']}>
                    <Box
                      width={1}
                      pt={10}
                      flexWrap="wrap"
                      display="flex"
                      px={2}
                    >
                      <Box width={1} textAlign="center">
                        <H4>{id ? 'Update' : 'Create'} Blog</H4>
                      </Box>

                      <Box width={1} mt={10} px={[0, 10, 30, 0]} mb={8}>
                        <Input
                          name="title"
                          OutlinedInputPlaceholder="Title*"
                          appendIcon
                          Icon={TitleOutlinedIcon}
                          IconClickable
                          variant="outlined"
                        />
                        <Box mt={10}>
                          <CKEditor
                            editor={ClassicEditor}
                            data={values.content}
                            config={customConfig}
                            onReady={(editor) => {
                              editor.editing.view.change((writer) => {
                                writer.setStyle(
                                  'min-height',
                                  '30vh',
                                  editor.editing.view.document.getRoot()
                                );
                              });
                              editor.editing.view.change((writer) => {
                                writer.setStyle(
                                  'color',
                                  'black',
                                  editor.editing.view.document.getRoot()
                                );
                              });
                            }}
                            onChange={(event, editor) => {
                              setFieldValue('content', editor.getData());
                            }}
                          />
                          {errors.content && touched.content && (
                            <FormHelperText error>
                              {errors.content}
                            </FormHelperText>
                          )}
                        </Box>
                      </Box>

                      <Box
                        display="flex"
                        flexWrap="wrap"
                        justifyContent="center"
                        width={1}
                        mt={10}
                        mb={7}
                      >
                        <Button
                          type="submit"
                          color="secondary"
                          variant="contained"
                          startIcon={<SaveIcon />}
                        >
                          {id ? 'Update' : 'Create'}
                        </Button>
                        <Box ml={2}>
                          <Button
                            onClick={() => {
                              navigateTo(history, '/blogs');
                            }}
                            startIcon={<ClearIcon fontSize="small" />}
                          >
                            Cancel
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Form>
            )}
          </Formik>
        </WrapInCard>
      </WrapInBreadcrumbs>
    </>
  );
}

CreateBlog.propTypes = {
  initialValues: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    file: PropTypes.string,
  }),
  id: PropTypes.number,
  onHandleSubmit: PropTypes.func,
};
CreateBlog.defaultProps = {
  initialValues: PropTypes.shape({
    title: '',
    content: '',
    file: '',
  }),
};

export default memo(CreateBlog);
