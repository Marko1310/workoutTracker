import { useState } from 'react';
import Set from './Set';
import ExerciseTitle from './ExerciseTitle';
import { exerciseDetailDto, ExerciseSets } from '../../types/workoutData';

const initialSet = {
  reps: 0,
  set: 0,
  weight: 0,
};

function Exercise({ exercise }: { exercise: exerciseDetailDto }) {
  const [exerciseSets, setExerciseSets] = useState<ExerciseSets>(
    exercise?.sessions ? exercise?.sessions : [initialSet],
  );

  const handleNewSet = () => {
    setExerciseSets((prevSets) => {
      const newSetIndex = prevSets?.length;
      const existingSet = exercise?.sessions && exercise?.sessions[newSetIndex];
      return [...prevSets, existingSet ? existingSet : initialSet];
    });
  };

  const handleDeleteSet = (index: number) => {
    setExerciseSets((prevSets) => {
      const existingSets = prevSets || [];
      const newSets = existingSets.filter((_, i) => i !== index);
      return newSets;
    });
  };
  return (
    <div className='mb-6 flex flex-col'>
      <p className='pt-6 text-lg font-bold'>{exercise.exercise_name}</p>
      <div className='flex flex-col'>
        <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
            <div className='overflow-hidden'>
              <table className='min-w-full text-left text-sm font-light'>
                <ExerciseTitle />
                <tbody>
                  {exerciseSets?.map((set, index) => {
                    return (
                      <Set
                        set={set}
                        index={index}
                        handleDeleteSet={handleDeleteSet}
                        setsCount={exerciseSets}
                      />
                    );
                  })}
                </tbody>
              </table>
              <button
                onClick={handleNewSet}
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
