import { UseFormRegister } from 'react-hook-form';
import { addNewSessionArrayDto, setArrayDto, setDto } from './types';
import { useEffect, useState } from 'react';

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
  const [weight, setWeight] = useState(set.weight);
  const [reps, setReps] = useState(set.reps);
  const [isPR, setIsPR] = useState(false);

  const deleteButtonRender = (index: number) => {
    return controlledSets.length - 1 === index && index !== 0;
  };

  useEffect(() => {
    const isCurrentSetHigher =
      reps &&
      weight &&
      set.previousReps &&
      set.previousWeight &&
      Number(reps) * Number(weight) > set.previousWeight * set.previousReps;
    setIsPR(!!isCurrentSetHigher);
  }, [weight, reps, set]);

  return (
    <tr className={`${isPR && ' bg-green-100'} border-b`}>
      <td className='whitespace-nowrap px-2 py-4 text-center font-bold'>
        {isPR && <p> PR!</p>}
      </td>
      <td className='whitespace-nowrap px-2 py-4 text-center font-medium'>
        {setIndex + 1}
      </td>
      <td className='whitespace-nowrap px-2 py-4 text-center'>
        {set.previousWeight}kg x {set.previousReps}
      </td>
      <td className='whitespace-nowrap py-2 text-center font-medium'>
        <input
          {...register(
            `exercisesData.${exerciseIndex}.sets.${setIndex}.weight`,
            {
              required: true,
              maxLength: 4,
              setValueAs: (value) => Number(value),
            },
          )}
          className={` ${
            isPR && ' bg-green-100'
          } w-16 py-2 text-center outline-none`}
          type='number'
          placeholder='kg'
          onChange={(e) => setWeight(e.target.value)}
          value={weight !== null ? weight : ''}
        />
      </td>
      <td className='whitespace-nowrap py-2 text-center font-medium'>
        <input
          {...register(`exercisesData.${exerciseIndex}.sets.${setIndex}.reps`, {
            required: true,
            maxLength: 3,
            setValueAs: (value) => Number(value),
          })}
          className={` ${
            isPR && ' bg-green-100'
          } w-16 py-2 text-center outline-none`}
          type='number'
          placeholder='reps'
          onChange={(e) => setReps(e.target.value)}
          value={reps !== null ? reps : ''}
        />
      </td>

      <td className='whitespace-nowrap py-2 text-center'>
        {deleteButtonRender(setIndex) && (
          <button
            onClick={() => deleteSet(setIndex)}
            className='font-bold text-red-500 transition-all hover:cursor-pointer hover:text-red-600'
          >
            X
          </button>
        )}
      </td>
    </tr>
  );
}
export default Set;
