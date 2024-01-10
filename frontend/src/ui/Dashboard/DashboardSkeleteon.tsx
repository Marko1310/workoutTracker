import { Skeleton } from '@mui/material';

function DashboardSkeleteon() {
  return (
    <div className='w-1/2 text-center'>
      <div className='flex w-full justify-center'>
        <Skeleton variant='circular' width={40} height={40} />
      </div>
      <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
      <div className='flex w-full justify-center'>
        <Skeleton variant='circular' width={40} height={40} />
      </div>
    </div>
  );
}
export default DashboardSkeleteon;
