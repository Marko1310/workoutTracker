import { useEffect } from 'react';
import InputField from '../Forms/InputField';
import FormTitle from '../Forms/FormTitle';
import Select from '../Forms/Select';
import { useAddNewProgram } from '../../queries/programQueries';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddNewProgramDto, AddNewProgramSchema } from '../../types/forms';

type newProgramModalProps = {
  closeModal: () => void;
};

function NewProgramModal({ closeModal }: newProgramModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AddNewProgramDto>({
    resolver: zodResolver(AddNewProgramSchema),
  });
  const { mutate, isPending } = useAddNewProgram();
  const onSubmit = (newProgram: AddNewProgramDto) => mutate(newProgram);
  const daysOfWeek = [1, 2, 3, 4, 5, 6, 7];

  useEffect(() => {
    if (!isPending) {
      closeModal();
    }
  }, [isPending, closeModal]);

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
        disabled={!isValid || isPending}
        className='hover:bg-primary-foreground disabled:bg-disabled mt-6 flex h-14 w-full items-center justify-center rounded-md bg-primary p-3 transition-all'
        type='submit'
      >
        {isPending ? 'Saving' : 'Add Program'}
      </button>
    </form>
  );
}
export default NewProgramModal;
