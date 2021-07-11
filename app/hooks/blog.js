import { useMutation, useQueryClient } from 'react-query';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';
import { deleteBlog } from '../state/queryFunctions';
import { keys } from '../state/queryKeys';
import { Toast, navigateTo } from '../utils/helper';

export function useDeleteBlog() {
  const queryClient = useQueryClient();
  const history = useHistory();
  return useMutation(deleteBlog, {
    onSuccess: ({
      data: {
        data: { count },
      },
    }) => {
      Swal.fire('Deleted!', `${count} blog deleted.`, 'success');
      queryClient.invalidateQueries(keys.blog);
      navigateTo(history, '/blogs');
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
