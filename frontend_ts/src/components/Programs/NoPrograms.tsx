import AssignmentIcon from '@mui/icons-material/Assignment';

function NoPrograms() {
  return (
    <div className='text-text flex h-full w-full flex-col items-center justify-center gap-3 rounded-lg border border-border bg-foreground p-8 shadow-sm'>
      <div className=''>
        <AssignmentIcon sx={{ fontSize: 80 }} />
      </div>
      <p className='mb-4 text-xl'> Get started</p>
      <div className='flex flex-col gap-2 text-center text-sm'>
        <p>It looks like you still don't have a Workout Program.</p>
        <p>To get started, create one by clicking the button above..</p>
      </div>
    </div>
  );
}

export default NoPrograms;
