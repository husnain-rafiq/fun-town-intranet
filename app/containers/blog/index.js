import { WrapInCard } from 'components';
import React, { memo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import BlogListing from '../../components/blogListing';
import WrapInBreadcrumbs from '../../components/layout/wrapInBreadcrumbs';
import { getBlogs } from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { Modal } from '../../utils/helper';
import { Loading } from '../../components/loading';
import { useDeleteBlog } from '../../hooks/blog';

function Blog() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useQuery([keys.blog, currentPage], getBlogs, {
    keepPreviousData: true,
  });
  const blog = data?.data?.data;
  const handleChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const mutation = useDeleteBlog();
  const handleDeleteBlog = (id) => {
    Modal.fire().then(({ isConfirmed }) => {
      if (isConfirmed) {
        mutation.mutate([id]);
        if (blog.rows.length === 1) {
          setCurrentPage(1);
        }
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>Blog</title>
        <meta name="ftrv blog listing" content="ftrv blog listing screen" />
      </Helmet>

      <WrapInBreadcrumbs>
        <WrapInCard>
          {isLoading ? (
            <Loading />
          ) : (
            <BlogListing
              currentPage={currentPage}
              blogs={blog.rows}
              handleChange={handleChange}
              count={blog.count}
              onHandleDeleteBlog={handleDeleteBlog}
            />
          )}
        </WrapInCard>
      </WrapInBreadcrumbs>
    </>
  );
}

export default memo(Blog);
