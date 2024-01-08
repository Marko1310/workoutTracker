import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addNewSessionArrayDto } from '../components/Session/types';
import sessionServices from '../services/sessionServices';
import { useNavigate } from 'react-router-dom';

const useAddNewSession = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
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
      navigate('/app/home');
    },
  });
  return { mutate, isPending };
};

const useGetSetCount = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['set-count'],
    queryFn: () => sessionServices.getSetCount(),
  });

  const setCount = data?.data?.setCount;
  return { setCount, isLoading, error };
};

const useGetTotalReps = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['total-reps'],
    queryFn: () => sessionServices.getTotalReps(),
  });
  const totalReps = data?.data.totalReps;
  return { totalReps, isLoading, error };
};

const useGetTotalWeight = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['total-weight'],
    queryFn: () => sessionServices.getTotalWeight(),
  });
  const totalWeight = data?.data.totalWeight;
  return { totalWeight, isLoading, error };
};

export { useAddNewSession, useGetSetCount, useGetTotalReps, useGetTotalWeight };
