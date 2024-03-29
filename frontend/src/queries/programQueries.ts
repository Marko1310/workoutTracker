import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import programServices from '../services/programServices';
import { AllProgramsDto } from '../types/workoutData';
import { ProgramDto } from '../types/workoutData';
import { toast } from 'react-hot-toast';
import { programQueryKeys } from '../types/queryKeys';

type AddNewProgramDto = {
  title: string;
  days: number;
};

const useAllPrograms = () => {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: [programQueryKeys.ALL_PROGRAMS],
    queryFn: () => programServices.getAllPrograms(),
  });

  const allProgramsData: AllProgramsDto = data?.data;
  return { allProgramsData, isLoading, isFetching, error };
};

const useCurrentProgram = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: [programQueryKeys.CURRENT_PROGRAM],
    queryFn: () => programServices.getCurrentProgram(),
  });
  const currentProgramData: ProgramDto = data?.data;
  return { currentProgramData, isLoading, error };
};

const useAddNewProgram = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: AddNewProgramDto) => programServices.addNewProgram(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [programQueryKeys.ALL_PROGRAMS],
      });
      toast.success('Program successfully added');
    },
    onError: () => {
      toast.error('Program could not be added');
    },
  });
  return { mutate, isPending };
};

const useDeleteProgram = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: number) => programServices.deleteProgram(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [programQueryKeys.ALL_PROGRAMS],
      });
      toast.success('Program successfully deleted');
    },
    onError: () => {
      toast.error('Program could not be deleted');
    },
  });
  return { mutate, isPending };
};

export {
  useAllPrograms,
  useCurrentProgram,
  useAddNewProgram,
  useDeleteProgram,
};
