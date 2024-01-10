import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addNewSessionArrayDto } from '../components/Session/types';
import sessionServices from '../services/sessionServices';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { sessionQueryKeys, workoutQueryKeys } from '../types/queryKeys';

const useAddNewSession = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: {
      workout_id: number;
      workoutData: addNewSessionArrayDto;
    }) => sessionServices.addNewSession(data.workout_id, data.workoutData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [workoutQueryKeys.PREVIOUS_WORKOUT_DETAILS],
      });
      toast.success('Workout saved');
      navigate('/app/home');
    },
    onError: () => {
      toast.error('Workout could not be saved');
    },
  });
  return { mutate, isPending };
};

const useGetSetCount = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: [sessionQueryKeys.SET_COUNT],
    queryFn: () => sessionServices.getSetCount(),
  });

  const setCount = data?.data?.setCount;
  return { setCount, isLoading, error };
};

const useGetTotalReps = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: [sessionQueryKeys.TOTAL_REPS],
    queryFn: () => sessionServices.getTotalReps(),
  });
  const totalReps = data?.data.totalReps;
  return { totalReps, isLoading, error };
};

const useGetTotalWeight = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: [sessionQueryKeys.TOTAL_WEIGHT],
    queryFn: () => sessionServices.getTotalWeight(),
  });
  const totalWeight = data?.data.totalWeight;
  return { totalWeight, isLoading, error };
};

export { useAddNewSession, useGetSetCount, useGetTotalReps, useGetTotalWeight };
