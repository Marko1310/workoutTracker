import CountUp from 'react-countup';

function Stats({ data, title, icon: Icon, color }) {
  return (
    <div className='flex w-full flex-col items-center justify-center gap-1 rounded-lg border px-20 py-8 '>
      <div className='mb-4'>
        <Icon fontSize='large' />
      </div>
      <p className='text-center text-xs'>{title}</p>
      <p className='text-3xl font-bold'>
        <CountUp
          start={0}
          end={data}
          duration={3}
          separator=','
          decimals={0}
          decimal=','
        />
      </p>
    </div>
  );
}

export default Stats;
