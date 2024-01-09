import Set from './Set';
import ExerciseTitle from './ExerciseTitle';
import { Control, useFieldArray, UseFormRegister } from 'react-hook-form';
import { addNewSessionArrayDto, addNewSessionDto } from './types';

const newSet = {
  previousWeight: 0,
  previousReps: 0,
  weight: '',
  reps: '',
};

function Exercise({
  index,
  exercise: initialExercisesData,
  control,
  register,
}: {
  index: number;
  exercise: addNewSessionDto;
  control: Control<addNewSessionArrayDto>;
  register: UseFormRegister<addNewSessionArrayDto>;
}) {
  const {
    fields: controlledSets,
    append,
    remove,
  } = useFieldArray({
    control,
    name: `exercisesData.${index}.sets`,
  });

  const addNewSet = () => {
    const newSetIndex = controlledSets.length;
    const existingSet =
      initialExercisesData?.sets[newSetIndex] &&
      initialExercisesData?.sets[newSetIndex];
    append(existingSet ? existingSet : newSet);
  };

  const deleteSet = (index: number) => {
    remove(index);
  };

  return (
    <div className='mb-6 flex flex-col'>
      <p className='pt-6 text-lg font-semibold'>
        {initialExercisesData.exercise_name}
      </p>
      <div className='flex flex-col'>
        <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
            <div className='overflow-hidden'>
              <table className='min-w-full text-left text-sm font-light'>
                <ExerciseTitle />
                <tbody>
                  {controlledSets?.map((set, setIndex) => {
                    return (
                      <Set
                        key={set.id}
                        set={set}
                        exerciseIndex={index}
                        setIndex={setIndex}
                        register={register}
                        deleteSet={deleteSet}
                        controlledSets={controlledSets}
                      />
                    );
                  })}
                </tbody>
              </table>
              <button
                type='button'
                onClick={addNewSet}
                className='mt-2 w-full rounded-md bg-slate-300 px-3 py-1 text-white transition-all hover:bg-slate-400'
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
