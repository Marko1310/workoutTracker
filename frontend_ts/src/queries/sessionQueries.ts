import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addNewSessionArrayDto } from '../components/Session/types';
import sessionServices from '../services/sessionServices';

const useAddNewSession = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (data: {
      workout_id: number;
      workoutData: addNewSessionArrayDto;
    }) => sessionServices.addNewSession(data.workout_id, data.workoutData),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['previousWorkoutWithDetails'],
      });
    },
    onSuccess: () => {
      console.log('success');
    },
  });
  return { mutate };
};

export { useAddNewSession };
