import { useState } from 'react';
import WorkoutList from '../Workouts/WorkoutList';
import { AllProgramsDto } from '../../types/workoutData';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ProgramMenu from './ProgramMenu';

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
            <div className='flex justify-between py-2'>
              <h1 className='px-4'>{program.programs_name}</h1>
              <ProgramMenu programId={program.programs_id} />
            </div>
            <div
              onClick={() => handleChange(program.programs_id)}
              className='flex w-full flex-col items-center justify-center pb-0 pt-0 hover:cursor-pointer'
            >
              <p className='text-xs'>List of workouts</p>
              {expandedIndex === program.programs_id ? (
                <KeyboardArrowUpIcon fontSize='medium' />
              ) : (
                <KeyboardArrowDownIcon fontSize='medium' />
              )}
            </div>
            <div
              className={`${
                expandedIndex === program.programs_id ? 'max-h-96' : 'max-h-0'
              } flex h-fit overflow-hidden overflow-y-auto transition-all duration-300`}
            >
              <WorkoutList
                workouts={program.workouts}
                programId={program.programs_id}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
