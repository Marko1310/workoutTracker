import { UseFormRegister } from 'react-hook-form';
import { addNewSessionArrayDto, setArrayDto, setDto } from './types';

function Set({
  set,
  exerciseIndex,
  setIndex,
  register,
  deleteSet,
  controlledSets,
}: {
  set: setDto;
  exerciseIndex: number;
  setIndex: number;
  register: UseFormRegister<addNewSessionArrayDto>;
  deleteSet: (index: number) => void;
  controlledSets: setArrayDto;
}) {
  const deleteButtonRender = (index: number) => {
    return controlledSets.length - 1 === index;
  };

  return (
    <tr className='border-b'>
      <td className='whitespace-nowrap px-2 py-4 text-center font-medium'>
        {setIndex + 1}
      </td>
      <td className='whitespace-nowrap px-2 py-4 text-center'>
        {set.previousWeight}kg x {set.previousReps}
      </td>
      <td className='whitespace-nowrap py-2 text-center font-medium'>
        <input
          {...register(
            `exerciseData.${exerciseIndex}.sets.${setIndex}.weight`,
            { required: true },
          )}
          className='w-16 py-2 text-center outline-none'
          type='number'
          placeholder='kg'
        />
      </td>
      <td className='whitespace-nowrap py-2 text-center font-medium'>
        <input
          {...register(`exerciseData.${exerciseIndex}.sets.${setIndex}.reps`)}
          className='w-16 py-2 text-center outline-none'
          type='number'
          placeholder='reps'
        />
      </td>
      {deleteButtonRender(setIndex) && (
        <td
          onClick={() => deleteSet(setIndex)}
          className='whitespace-nowrap py-2 text-center font-bold text-red-500 transition-all hover:cursor-pointer hover:text-red-600'
        >
          X
        </td>
      )}
    </tr>
  );
}
export default Set;
