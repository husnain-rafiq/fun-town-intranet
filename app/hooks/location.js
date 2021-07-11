import { useMutation, useQueryClient } from 'react-query';
import Swal from 'sweetalert2';
import { deleteLocation } from '../state/queryFunctions';
import { keys } from '../state/queryKeys';
import { Toast, isFunction } from '../utils/helper';

export function useDeleteLocation({ callbackFn } = {}) {
  const queryClient = useQueryClient();
  return useMutation(deleteLocation, {
    onSuccess: ({
      data: {
        data: { count },
      },
    }) => {
      if (isFunction(callbackFn)) callbackFn();
      Swal.fire('Deleted!', `${count} location(s) deleted.`, 'success');
      queryClient.invalidateQueries(keys.locations);
    },
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
}
