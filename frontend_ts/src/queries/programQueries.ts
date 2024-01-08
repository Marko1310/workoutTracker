import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import programServices from '../services/programServices';
import { AllProgramsDto } from '../types/workoutData';
import { ProgramDto } from '../types/workoutData';

type AddNewProgramDto = {
  title: string;
  days: number;
};

const useAllPrograms = () => {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ['all-programs'],
    queryFn: () => programServices.getAllPrograms(),
  });

  const allProgramsData: AllProgramsDto = data?.data;
  return { allProgramsData, isLoading, isFetching, error };
};

const useCurrentProgram = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['programs'],
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
      queryClient.invalidateQueries({ queryKey: ['all-programs'] });
    },
  });
  return { mutate, isPending };
};

const useDeleteProgram = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: number) => programServices.deleteProgram(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-programs'] });
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
