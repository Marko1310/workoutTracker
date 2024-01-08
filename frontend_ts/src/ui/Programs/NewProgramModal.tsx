import InputField from '../Forms/InputField';
import FormTitle from '../Forms/FormTitle';
import Select from '../Forms/Select';
import { useAddNewProgram } from '../../queries/programQueries';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddNewProgramDto, AddNewProgramSchema } from '../../types/forms';
import CircularProgress from '@mui/material/CircularProgress';

function NewProgramModal() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddNewProgramDto>({
    resolver: zodResolver(AddNewProgramSchema),
  });
  const { mutate, isPending } = useAddNewProgram();
  const onSubmit = (newProgram: AddNewProgramDto) => mutate(newProgram);
  const daysOfWeek = [1, 2, 3, 4, 5, 6, 7];

  return (
    <form
      className='flex w-96 flex-col gap-4 p-4'
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormTitle title='Add new program' />
      <div className='flex flex-col gap-1'>
        <label>Program Title</label>
        <InputField
          name='title'
          register={register}
          placeholder='e.g. Push / Pull / Legs'
          errors={errors}
        />
      </div>

      <div className='flex flex-col gap-1'>
        <label>Days per week</label>
        <Select
          name='days'
          defaultValue=''
          options={daysOfWeek}
          register={register}
          errors={errors}
        />
      </div>

      <button
        disabled={isPending}
        className='mt-6 flex h-14 w-full items-center justify-center rounded-md bg-orange-300 p-3 transition-all hover:bg-orange-400 disabled:bg-slate-300'
        type='submit'
      >
        {isPending ? <CircularProgress /> : 'Add Program'}
      </button>
    </form>
  );
}
export default NewProgramModal;
