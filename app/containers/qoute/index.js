import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import Box from '@material-ui/core/Box';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useHistory } from 'react-router';
import { navigateTo, Toast } from '../../utils/helper';
import Quote from '../../components/pages/quote';
import WrapInBreadcrumbs from '../../components/layout/wrapInBreadcrumbs';
import WrapInCard from '../../components/layout/wrapInCard';
import { keys } from '../../state/queryKeys';
import { getQuote, saveQuote } from '../../state/queryFunctions';
import { Loading } from '../../components/loading';

function QuoteContainer() {
  const history = useHistory();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(keys.quote, getQuote);
  const mutation = useMutation(saveQuote, {
    onSuccess: () => {
      Toast({
        icon: 'success',
        title: 'Quote updated successfully',
      });
      navigateTo(history, '/home');
      queryClient.invalidateQueries(keys.quote);
    },
    onError: ({
      response: {
        data: { message },
      },
    }) =>
      Toast({
        icon: 'error',
        title: message || 'Some error occurred',
      }),
  });
  const handleSubmit = ({ quote }) => {
    mutation.mutate({ data: quote });
  };

  return (
    <>
      <Helmet>
        <title>Quote</title>
      </Helmet>
      <WrapInBreadcrumbs>
        <Box width={1} my={5}>
          <WrapInCard mb={8}>
            {isLoading ? (
              <Loading />
            ) : (
              <Quote handleSubmit={handleSubmit} value={data?.data?.data} />
            )}
          </WrapInCard>
        </Box>
      </WrapInBreadcrumbs>
    </>
  );
}

export default memo(QuoteContainer);
