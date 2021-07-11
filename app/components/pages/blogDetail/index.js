import React, { memo } from 'react';
import Box from '@material-ui/core/Box';
import { Avatar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import ReactHtmlParser from 'html-react-parser';
import { H5, BodyTextLarge } from '../../typography';
import BlogCreatorInfo from '../blog/blogCreatorInfo';

const useStyles = makeStyles(() => ({
  root: {
    '& img': { width: '100%' },
    '& iframe': { padding: '0 5%' },
  },
  imageView: {
    width: '100%',
    height: 'auto',
  },
}));

function BlogDetail({ title, createdAt, content, thumbnail, user }) {
  const classes = useStyles();
  const history = useHistory();
  return (
    <>
      <Box mt={2} mb={4}>
        <Button
          variant="text"
          startIcon={<KeyboardBackspaceIcon />}
          onClick={() => history.goBack()}
        >
          Back
        </Button>
      </Box>
      <Box ml={3}>
        <Box my={7}>
          <H5> {title} </H5>
          <Box mt={3}>
            <BlogCreatorInfo user={user} createdAt={createdAt} />
          </Box>
          {thumbnail && (
            <Box width={[1, 1, 1, '40%']} mt={2}>
              {' '}
              <Avatar
                variant="square"
                src={thumbnail}
                className={classes.imageView}
              />
            </Box>
          )}
          <Box mt={7}>
            <BodyTextLarge fontWeight="fontWeightMedium" color="grey">
              <Box className={classes.root}>{ReactHtmlParser(content)}</Box>
            </BodyTextLarge>
          </Box>
        </Box>
      </Box>
    </>
  );
}
BlogDetail.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  thumbnail: PropTypes.string,
  createdAt: PropTypes.string,
  user: PropTypes.object,
};

export default memo(BlogDetail);
