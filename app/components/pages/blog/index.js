import React, { memo } from 'react';
import Box from '@material-ui/core/Box';
import { Avatar, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ReactHtmlParser from 'html-react-parser';
import { H5, BodyTextLarge } from '../../typography';
import { useAuthContext } from '../../../context/authContext';
import { ROLES } from '../../../utils/constants';
import BlogCreatorInfo from './blogCreatorInfo';
import { navigateTo } from '../../../utils/helper';

const useStyles = makeStyles(() => ({
  imageView: {
    width: '90%',
    height: '180px',
    borderRadius: '6px',
  },
  title: {
    cursor: 'pointer',
  },
}));
function Blog({
  id,
  title,
  thumbnail,
  shortText,
  user,
  createdAt,
  onHandleDeleteBlog,
}) {
  const {
    user: {
      data: { role },
    },
  } = useAuthContext();

  const classes = useStyles();
  const history = useHistory();
  const truncate = (source, size) =>
    source.length > size ? `${source.slice(0, size - 1)} . . .` : source;

  return (
    <Box
      display="flex"
      flexDirection={['column', 'row', 'row', 'row']}
      mt={6}
      mb={8}
    >
      <Box width={[1, '55%', '30%', '22%']} mt={3}>
        {' '}
        <Avatar
          variant="square"
          src={thumbnail}
          className={classes.imageView}
        />
      </Box>
      <Box width={[1, '30', '60%', '75%']}>
        <Box display="flex" flexDirection="row" mt={0.5}>
          <Box width={[1, 1 / 2]} mt={2}>
            <H5
              className={classes.title}
              onClick={() => navigateTo(history, `/blogs/detail/${id}`)}
            >
              {title}
            </H5>
          </Box>
          {role === ROLES.ADMIN && (
            <Box width={[1, 1 / 2]} display="flex" justifyContent="flex-end">
              <IconButton>
                <EditIcon
                  color="secondary"
                  onClick={() => navigateTo(history, `/blogs/edit/${id}`)}
                />
              </IconButton>
              <IconButton onClick={() => onHandleDeleteBlog(id)}>
                <DeleteIcon color="error" />
              </IconButton>
            </Box>
          )}
        </Box>
        <Box>
          <BodyTextLarge color="grey">
            {truncate(ReactHtmlParser(shortText), 200)}
          </BodyTextLarge>
        </Box>
        <Box display="flex" flexDirection="column" mt={8}>
          <BlogCreatorInfo user={user} createdAt={createdAt} />
        </Box>
      </Box>
    </Box>
  );
}
Blog.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  shortText: PropTypes.string,
  user: PropTypes.object,
  createdAt: PropTypes.string,
};

Blog.defaultProps = {
  title: '',
  thumbnail: '',
  shortText: '',
  user: {},
  createdAt: '',
};

export default memo(Blog);
