import React, { memo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation, useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import { Loading } from '../../components/loading';
import Home from '../../components/pages/home';
import { useAuthContext } from '../../context/authContext';
import {
  fetchEvents,
  getBannerImage,
  updateBannerImage,
} from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { Toast, navigateTo } from '../../utils/helper';

function HomeContainer() {
  const { user } = useAuthContext();
  const history = useHistory();
  const { data, isEventsLoading } = useQuery(keys.events, fetchEvents);

  const {
    data: image,
    isLoading: isImageLoading,
    refetch: refetchBannerImage,
  } = useQuery(keys.bannerImage, getBannerImage);

  const onUpdateImageSuccess = () => {
    Toast({
      icon: 'success',
      title: `Image Updated Successfully`,
    });
    refetchBannerImage();
  };
  const onUpdateImageError = ({
    response: {
      data: { message },
    },
  }) => {
    Toast({
      icon: 'error',
      title: message || 'Some error occurred',
    });
  };

  const { mutate, isLoading: isUpdateImageLoading } = useMutation(
    updateBannerImage,
    {
      onSuccess: onUpdateImageSuccess,
      onError: onUpdateImageError,
    }
  );

  useEffect(() => {
    if (!user || !user.isAuthenticated) {
      navigateTo(history, '/');
    }
  }, []);

  const handleImageChange = (fileObj) => {
    if (fileObj?.file) {
      const formData = new FormData();
      formData.append('file', fileObj?.file);
      mutate(formData);
    }
  };

  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Description of Home" />
      </Helmet>
      {isEventsLoading ? (
        <Loading />
      ) : (
        <Home
          isImageLoading={isUpdateImageLoading || isImageLoading}
          eventList={data?.data?.data?.rows}
          fileName={image?.data?.data?.fileName}
          onHandleImageChange={handleImageChange}
        />
      )}
    </>
  );
}

export default memo(HomeContainer);
