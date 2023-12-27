import { useState } from 'react';

export default function Programs() {
  const [expandedIndex, setExpandedIndex] = useState<null | number>(null);

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
    <div className='flex flex-col gap-8'>
      <button className='h-16 w-52 rounded-lg border-0 bg-orange-300 p-4 text-black transition-all hover:bg-orange-400'>
        + Create a new Program
      </button>
      <div className='flex flex-col gap-2'>
        <h1>Select your Program:</h1>
        <div className='flex flex-col px-4'>
          <ul>
            {programs.map((program) => {
              return (
                <li
                  key={program.id}
                  className='my-4 w-full flex-col rounded-md border-2 border-neutral-500 pb-0'
                >
                  <h1 className='px-4 pt-4'>{program.program}</h1>
                  <div
                    onClick={() => handleChange(program.id)}
                    className='flex w-full items-center justify-center pb-2 pt-4'
                  >
                    icon
                  </div>
                  <div
                    className={`${
                      expandedIndex === program.id ? 'max-h-40' : 'max-h-0'
                    } flex h-fit overflow-hidden bg-slate-300 transition-all`}
                  >
                    <ul>
                      {program.workouts.map((workout, index) => {
                        return <li key={index}>{workout}</li>;
                      })}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
