import { useMutation, useQueryClient } from 'react-query';
import { Toast } from '../utils/helper';
import { createDepartment } from '../state/queryFunctions';
import { keys } from '../state/queryKeys';

export function useCreateDepartment() {
  const queryClient = useQueryClient();
  return useMutation(createDepartment, {
    onSuccess: () => {
      Toast({
        icon: 'success',
        title: 'Department created successfully',
      });
      queryClient.invalidateQueries(keys.department);
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
