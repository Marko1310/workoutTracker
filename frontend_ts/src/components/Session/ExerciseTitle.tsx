function ExerciseTitle() {
  return (
    <thead className='border-b bg-white font-medium '>
      <tr>
        <th scope='col' className='w-1/6 px-2 py-4 text-center text-orange-500'>
          SET
        </th>
        <th scope='col' className='w-2/6 px-2 py-4 text-center text-orange-500'>
          PREVIOUS
        </th>
        <th scope='col' className='w-1/6 px-2 py-4 text-center text-orange-500'>
          KG
        </th>
        <th scope='col' className='w-1/6 px-2 py-4 text-center text-orange-500'>
          REPS
        </th>
        <th
          scope='col'
          className='w-1/12 px-2 py-4 text-center text-orange-500'
        ></th>
      </tr>
    </thead>
  );
}
export default ExerciseTitle;
