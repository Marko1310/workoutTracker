import { useParams } from 'react-router-dom';
import { usePreviousWorkoutWithDetails } from '../../queries/workoutQueries';

function Session() {
  const { workoutId } = useParams();
  const numericWorkoutId = parseInt(workoutId!, 10);

  const { previousWorkoutWithDetails: workout } =
    usePreviousWorkoutWithDetails(numericWorkoutId);

  return (
    <div className=' h-fit flex-col'>
      <div className='flex w-full items-center justify-between border-b border-black pb-2'>
        <p className='text-xl font-bold'>{workout?.workout_name}</p>
        <p>{`# Week ${workout?.week + 1}`}</p>
        <button className='rounded-lg bg-blue-300 px-3 py-1'>Finish</button>
      </div>

      {workout?.exercises?.map((exercise) => {
        return (
          <div key={exercise?.exercises_id} className='mb-6 flex flex-col'>
            <p className='pt-6 text-lg font-bold'>{exercise.exercise_name}</p>
            <div className='flex flex-col'>
              <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
                <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
                  <div className='overflow-hidden'>
                    <table className='min-w-full text-left text-sm font-light'>
                      <thead className='border-b bg-white font-medium '>
                        <tr>
                          <th
                            scope='col'
                            className='w-1/6 px-2 py-4 text-center text-orange-500'
                          >
                            SET
                          </th>
                          <th
                            scope='col'
                            className='w-2/6 px-2 py-4 text-center text-orange-500'
                          >
                            PREVIOUS
                          </th>
                          <th
                            scope='col'
                            className='w-1/6 px-2 py-4 text-center text-orange-500'
                          >
                            KG
                          </th>
                          <th
                            scope='col'
                            className='w-1/6 px-2 py-4 text-center text-orange-500'
                          >
                            REPS
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {exercise.sessions.map((session, index) => {
                          return (
                            <tr key={session.sessions_id} className='border-b'>
                              <td className='whitespace-nowrap px-2 py-4 text-center font-medium'>
                                {index + 1}
                              </td>
                              <td className='whitespace-nowrap px-2 py-4 text-center'>
                                {session.weight}kg x {session.reps}
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
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default Session;
