import { useMutation, useQueryClient } from 'react-query';
import Swal from 'sweetalert2';
import { deleteUser } from '../state/queryFunctions';
import { keys } from '../state/queryKeys';
import { Toast, isFunction } from '../utils/helper';

export function useDeleteUser({ callbackFn } = {}) {
  const queryClient = useQueryClient();
  return useMutation(deleteUser, {
    onSuccess: ({
      data: {
        data: { count },
      },
    }) => {
      if (isFunction(callbackFn)) callbackFn();
      Swal.fire('Deleted!', `${count} user(s) deleted.`, 'success');
      queryClient.invalidateQueries(keys.getUsers({}));
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
