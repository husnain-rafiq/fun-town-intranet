import { useMutation, useQueryClient } from 'react-query';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';
import { deleteLinkCategory } from '../state/queryFunctions';
import { keys } from '../state/queryKeys';
import { Toast, navigateTo } from '../utils/helper';

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  const history = useHistory();
  return useMutation(deleteLinkCategory, {
    onSuccess: () => {
      Swal.fire('Deleted!', `Category deleted.`, 'success');
      queryClient.invalidateQueries(keys.linkCategory);
      navigateTo(history, '/link-categories');
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
