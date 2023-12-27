import { useState } from 'react';
import WorkoutList from './WorkoutList';
import { AllProgramsDto } from '../../types/workoutData';

export default function ProgramList({
  allProgramsData,
}: {
  allProgramsData: AllProgramsDto;
}) {
  const [expandedIndex, setExpandedIndex] = useState<null | number>(null);

  const handleChange = (id: number) => {
    setExpandedIndex((prevIndex) => (prevIndex === id ? null : id));
  };

  return (
    <ul>
      {allProgramsData?.map((program) => {
        return (
          <li
            key={program.programs_id}
            className='my-4 w-full flex-col rounded-md border-2 border-neutral-500 pb-0'
          >
            <h1 className='px-4 pt-4'>{program.programs_name}</h1>
            <div className='flex w-full flex-col items-center justify-center pb-0 pt-0'>
              <h1 className='text-xs'>List of workouts</h1>
              <div
                className='hover:cursor-pointer'
                onClick={() => handleChange(program.programs_id)}
              >
                icon
              </div>
            </div>
            <div
              className={`${
                expandedIndex === program.programs_id ? 'max-h-96' : 'max-h-0'
              } flex h-fit overflow-hidden overflow-y-auto transition-all duration-300`}
            >
              <WorkoutList workouts={program.workouts} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
