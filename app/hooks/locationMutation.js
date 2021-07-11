import { useMutation, useQueryClient } from 'react-query';
import { Toast } from '../utils/helper';
import { createLocation } from '../state/queryFunctions';
import { keys } from '../state/queryKeys';

export function useCreateLocation() {
  const queryClient = useQueryClient();
  return useMutation(createLocation, {
    onSuccess: () => {
      Toast({
        icon: 'success',
        title: 'Location created successfully',
      });
      queryClient.invalidateQueries(keys.location);
    },
    onError: ({
      response: {
        data: { message },
      },
    }) => {
      Toast({
        icon: 'error',
        title: message,
      });
    },
  });
}
