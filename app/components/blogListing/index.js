import { Box, Divider, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import Pagination from '@material-ui/lab/Pagination';
import SpeakerNotesOutlinedIcon from '@material-ui/icons/SpeakerNotesOutlined';
import { useHistory } from 'react-router-dom';
import Blog from '../pages/blog';
import { H5 } from '../typography';
import { useAuthContext } from '../../context/authContext';
import { ROLES, PAGE_SIZE } from '../../utils/constants';
import NotExist from '../pages/notExist/index';
import { navigateTo } from '../../utils/helper';

const useStyles = makeStyles((theme) => ({
  paginator: {
    justifyContent: 'center',
    marginTop: theme.spacing(5),
  },
  iconImage: {
    width: '10%',
    height: '10%',
  },
}));

export function BlogListing({
  currentPage,
  blogs,
  handleChange,
  count,
  onHandleDeleteBlog,
}) {
  const classes = useStyles();
  const history = useHistory();
  const {
    user: {
      data: { role },
    },
  } = useAuthContext();
  const defaultPage = 1;
  const noOfPages = Math.ceil(count / PAGE_SIZE);
  return (
    <>
      <Box m={4}>
        <Box>
          <H5>Blogs</H5>
        </Box>
        {role === ROLES.ADMIN && (
          <Box mt={10}>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<AddIcon />}
              onClick={() => navigateTo(history, '/blogs/add')}
            >
              New Blog
            </Button>
          </Box>
        )}
        {count > 0 ? (
          <Box>
            {blogs && blogs?.length >= 1 && (
              <Box mt={5}>
                {blogs.map(
                  ({ id, title, thumbnail, shortText, user, createdAt }) => (
                    <Box>
                      <Blog
                        id={id}
                        title={title}
                        thumbnail={thumbnail}
                        shortText={shortText}
                        user={user}
                        createdAt={createdAt}
                        onHandleDeleteBlog={onHandleDeleteBlog}
                      />
                      {blogs[blogs.length - 1].id !== id && <Divider />}
                    </Box>
                  )
                )}
              </Box>
            )}
            <Box component="span">
              <Pagination
                count={noOfPages}
                page={currentPage}
                onChange={handleChange}
                defaultPage={defaultPage}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
                classes={{ ul: classes.paginator }}
              />
            </Box>
          </Box>
        ) : (
          <NotExist
            Icon={SpeakerNotesOutlinedIcon}
            description=" No Blogs To Show"
          />
        )}
      </Box>
    </>
  );
}

export default BlogListing;
