import { useState } from 'react';
import WorkoutList from './WorkoutList';

export default function ProgramList() {
  const [expandedIndex, setExpandedIndex] = useState<null | number>(1);

  const handleChange = (id: number) => {
    setExpandedIndex((prevIndex) => (prevIndex === id ? null : id));
  };

  const programs = [
    {
      id: 1,
      program: '1. Push / Pull / Legs',
      workouts: ['Push', 'Pull', 'Legs'],
    },
    { id: 2, program: '2. Upper / Lower', workouts: ['Upper', 'Lower'] },
    { id: 3, program: '3. Full Body', workouts: ['something', 'something'] },
  ];

  return (
    <ul>
      {programs.map((program) => {
        return (
          <li
            key={program.id}
            className='my-4 w-full flex-col rounded-md border-2 border-neutral-500 pb-0'
          >
            <h1 className='px-4 pt-4'>{program.program}</h1>
            <div className='flex w-full flex-col items-center justify-center pb-0 pt-0'>
              <h1 className='text-xs'>List of workouts</h1>
              <div
                className='hover:cursor-pointer'
                onClick={() => handleChange(program.id)}
              >
                icon
              </div>
            </div>
            <div
              className={`${
                expandedIndex === program.id ? 'max-h-96' : 'max-h-0'
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
