function Set({ set, index, handleDeleteSet, setsCount }) {
  console.log(set);

  return (
    <tr key={index} className='border-b'>
      <td className='whitespace-nowrap px-2 py-4 text-center font-medium'>
        {index + 1}
      </td>
      <td className='whitespace-nowrap px-2 py-4 text-center'>
        {set.weight}kg x {set.reps}
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
      {setsCount.length - 1 === index && (
        <td
          onClick={() => handleDeleteSet(index)}
          className='whitespace-nowrap py-2 text-center font-bold text-red-500 transition-all hover:cursor-pointer hover:text-red-600'
        >
          X
        </td>
      )}
    </tr>
  );
}
export default Set;
