function Session() {
  return (
    <div className='h-fit flex-col'>
      <div className='flex w-full items-center justify-between border-2'>
        <p className='text-lg font-bold'>PUSH</p>
        <p># Week 2</p>
        <button className='rounded-lg bg-blue-300 px-3 py-1'>Finish</button>
      </div>
      <div className='flex flex-col'>
        <p className='pt-6 text-xl font-bold'>Bench Press</p>
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
                    <tr className='border-b bg-neutral-100'>
                      <td className='whitespace-nowrap px-2 py-4 text-center font-medium'>
                        1
                      </td>
                      <td className='whitespace-nowrap px-2 py-4 text-center'>
                        100kg X 12
                      </td>
                      <td className='whitespace-nowrap py-2 text-center font-medium'>
                        <input
                          className='w-16 bg-neutral-100 py-2 text-center outline-none'
                          type='number'
                          placeholder='kg'
                        />
                      </td>
                      <td className='whitespace-nowrap py-2 text-center font-medium'>
                        <input
                          className='w-16 bg-neutral-100 py-2 text-center outline-none'
                          type='number'
                          placeholder='reps'
                        />
                      </td>
                    </tr>
                    <tr className='border-b bg-white '>
                      <td className='whitespace-nowrap px-2 py-4 text-center font-medium'>
                        2
                      </td>
                      <td className='whitespace-nowrap px-2 py-4 text-center'>
                        100kg X 12
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
                    <tr className='border-b bg-neutral-100'>
                      <td className='whitespace-nowrap px-2 py-4 text-center font-medium'>
                        3
                      </td>
                      <td className='whitespace-nowrap px-2 py-4 text-center'>
                        100kg X 12
                      </td>
                      <td className='whitespace-nowrap py-2 text-center font-medium'>
                        <input
                          className='w-16 bg-neutral-100 py-2 text-center outline-none'
                          type='number'
                          placeholder='kg'
                        />
                      </td>
                      <td className='whitespace-nowrap py-2 text-center font-medium'>
                        <input
                          className='w-16 bg-neutral-100 py-2 text-center outline-none'
                          type='number'
                          placeholder='reps'
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col'>
        <p className='pt-6 text-xl font-bold'>Bench Press</p>
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
                    <tr className='border-b bg-neutral-100'>
                      <td className='whitespace-nowrap px-2 py-4 text-center font-medium'>
                        1
                      </td>
                      <td className='whitespace-nowrap px-2 py-4 text-center'>
                        100kg X 12
                      </td>
                      <td className='whitespace-nowrap py-2 text-center font-medium'>
                        <input
                          className='w-16 bg-neutral-100 py-2 text-center outline-none'
                          type='number'
                          placeholder='kg'
                        />
                      </td>
                      <td className='whitespace-nowrap py-2 text-center font-medium'>
                        <input
                          className='w-16 bg-neutral-100 py-2 text-center outline-none'
                          type='number'
                          placeholder='reps'
                        />
                      </td>
                    </tr>
                    <tr className='border-b bg-white '>
                      <td className='whitespace-nowrap px-2 py-4 text-center font-medium'>
                        2
                      </td>
                      <td className='whitespace-nowrap px-2 py-4 text-center'>
                        100kg X 12
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
                    <tr className='border-b bg-neutral-100'>
                      <td className='whitespace-nowrap px-2 py-4 text-center font-medium'>
                        3
                      </td>
                      <td className='whitespace-nowrap px-2 py-4 text-center'>
                        100 X 12
                      </td>
                      <td className='whitespace-nowrap py-2 text-center font-medium'>
                        <input
                          className='w-16 bg-neutral-100 py-2 text-center outline-none'
                          type='number'
                          placeholder='kg'
                        />
                      </td>
                      <td className='whitespace-nowrap py-2 text-center font-medium'>
                        <input
                          className='w-16 bg-neutral-100 py-2 text-center outline-none'
                          type='number'
                          placeholder='reps'
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Session;
