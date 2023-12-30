import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import workoutServices from '../services/workoutServices';
import programServices from '../services/programServices';
import { AllProgramsDto } from '../types/workoutData';
import { ProgramDto } from '../types/workoutData';

type AddNewProgramDto = {
  title: string;
  days: number;
};

const useAllPrograms = (userId: number | undefined) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['all-programs', userId],
    queryFn: () => programServices.getAllPrograms(userId),
    enabled: !!userId,
  });

  const allProgramsData: AllProgramsDto = data?.data;
  return { allProgramsData, isLoading, error };
};

const useCurrentProgram = (userId: number | undefined) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['programs', userId],
    queryFn: () => workoutServices.getCurrentProgram(userId),
    enabled: !!userId,
  });

  const currentProgramData: ProgramDto = data?.data;
  return { currentProgramData, isLoading, error };
};

const useAddNewProgram = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (data: AddNewProgramDto) => programServices.addNewProgram(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-programs'] });
    },
  });
  return { mutate };
};

export { useAllPrograms, useCurrentProgram, useAddNewProgram };
