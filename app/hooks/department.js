import { useMutation, useQueryClient } from 'react-query';
import Swal from 'sweetalert2';
import { deleteDepartment } from '../state/queryFunctions';
import { keys } from '../state/queryKeys';
import { Toast, isFunction } from '../utils/helper';

export function useDeleteDepartment({ callbackFn } = {}) {
  const queryClient = useQueryClient();
  return useMutation(deleteDepartment, {
    onSuccess: ({ data: { data } }) => {
      if (isFunction(callbackFn)) callbackFn();
      Swal.fire('Deleted!', `${data} department(s) deleted.`, 'success');
      queryClient.invalidateQueries(keys.departments);
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
