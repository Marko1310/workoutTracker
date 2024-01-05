import {
  newSessionSetArrayDto,
  newSessionSetDto,
} from '../../types/workoutData';

function Set({
  set,
  index,
  handleDeleteSet,
  exerciseSets, // register,
}: {
  set: newSessionSetDto;
  index: number;
  // register: UseFormRegister<addNewSessionArrayDto>;
  handleDeleteSet: (index: number) => void;
  exerciseSets: newSessionSetArrayDto;
}) {
  const deleteButtonRender = (index: number) => {
    return exerciseSets.length - 1 === index;
  };

  return (
    <tr className='border-b'>
      <td className='whitespace-nowrap px-2 py-4 text-center font-medium'>
        {index + 1}
      </td>
      <td className='whitespace-nowrap px-2 py-4 text-center'>
        {set.weight}kg x {set.reps}
      </td>
      <td className='whitespace-nowrap py-2 text-center font-medium'>
        <input
          className='w-16 py-2 text-center outline-none'
          type='number'
          placeholder='kg'
        />
      </td>
      <td className='whitespace-nowrap py-2 text-center font-medium'>
        <input
          className='w-16 py-2 text-center outline-none'
          type='number'
          placeholder='reps'
        />
      </td>
      {deleteButtonRender(index) && (
        <td
          onClick={() => handleDeleteSet(index)}
          className='whitespace-nowrap py-2 text-center font-bold text-red-500 transition-all hover:cursor-pointer hover:text-red-600'
        >
          X
        </td>
      )}
    </tr>
  );
}
export default Set;
