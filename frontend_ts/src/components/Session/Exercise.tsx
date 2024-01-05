import Set from './Set';
import ExerciseTitle from './ExerciseTitle';
import {
  addNewSessionArrayDto,
  addNewSessionDto,
} from '../../types/workoutData';
import { Control, useFieldArray, UseFormRegister } from 'react-hook-form';

const initialSet = {
  reps: 0,
  weight: 0,
};

function Exercise({
  index,
  exercise: defaultExercises,
  control, // register,
}: {
  index: number;
  exercise: addNewSessionDto;
  control: Control<addNewSessionArrayDto>;
  register: UseFormRegister<addNewSessionArrayDto>;
}) {
  const {
    fields: sets,
    append,
    remove,
  } = useFieldArray({
    control,
    name: `exerciseData.${index}.sets`,
  });

  const handleAddSets = () => {
    const newSetIndex = sets.length;
    const newSet =
      defaultExercises?.sets[newSetIndex] &&
      defaultExercises?.sets[newSetIndex];
    append(newSet ? newSet : initialSet);
  };

  const handleDeleteSet = (index: number) => {
    remove(index);
  };
  return (
    <div className='mb-6 flex flex-col'>
      <p className='pt-6 text-lg font-bold'>{defaultExercises.exercise_name}</p>
      <div className='flex flex-col'>
        <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
            <div className='overflow-hidden'>
              <table className='min-w-full text-left text-sm font-light'>
                <ExerciseTitle />
                <tbody>
                  {sets?.map((set, index) => {
                    return (
                      <Set
                        key={index}
                        set={set}
                        index={index}
                        // register={register}
                        handleDeleteSet={handleDeleteSet}
                        exerciseSets={sets}
                      />
                    );
                  })}
                </tbody>
              </table>
              <button
                type='button'
                onClick={() => handleAddSets()}
                className='w-full rounded-lg bg-slate-300 px-3 py-1 text-white transition-all hover:bg-slate-400'
              >
                + Add Set
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Exercise;
