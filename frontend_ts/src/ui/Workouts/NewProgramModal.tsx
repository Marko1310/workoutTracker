import { useForm } from 'react-hook-form';

function NewProgramModal() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form
      className='flex w-96 flex-col gap-4 p-4'
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className='text-center text-xl font-bold uppercase'>
        Add new Program
      </h1>
      <div className='flex flex-col gap-1'>
        <label>Program Title</label>
        <input
          placeholder='e.g. Push / Pull / Legs'
          className='h-14 w-full rounded-md border-[1px] border-neutral-400 pl-2 font-montserrat text-lg font-light transition-all focus-within:border-2 hover:border-2 hover:border-neutral-400 focus:border-neutral-600 focus:outline-none'
          {...register('program_title', { required: true })}
        />
        {errors.program_title && (
          <p className='text-red-500'>Title is required</p>
        )}
      </div>

      <div className='flex flex-col gap-1'>
        <label>Days per week</label>
        <select
          defaultValue=''
          className='h-14 w-full rounded-md border-[1px] border-neutral-400 pl-2 focus-within:border-2 hover:border-2 hover:border-neutral-400 focus:border-neutral-600 focus:outline-none'
          {...(register('days'), { required: true })}
        >
          <option value='' disabled></option>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
          <option value='6'>6</option>
          <option value='7'>7</option>
        </select>
        {errors.days && <p className='text-red-500'>Title is required</p>}
      </div>

      <button
        className='w-full rounded-md bg-orange-300 p-3 transition-all hover:bg-orange-400'
        type='submit'
      >
        Add Program
      </button>
    </form>
  );
}
export default NewProgramModal;
