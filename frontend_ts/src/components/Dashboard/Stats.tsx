function Stats({ data, title, icon: Icon, color }) {
  return (
    <div className='flex w-full flex-col items-center justify-center gap-1 rounded-lg border px-20 py-8 '>
      <div className='mb-4'>
        <Icon fontSize='large' />
      </div>
      <p className='text-center text-xs'>{title}</p>
      <p className='text-3xl font-bold'>{data}</p>
    </div>
  );
}

export default Stats;
