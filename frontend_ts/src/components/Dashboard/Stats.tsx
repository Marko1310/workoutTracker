import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import CountUp from 'react-countup';
import DashboardSkeleteon from '../../ui/Dashboard/DashboardSkeleteon';

type statsProps = {
  data: number;
  isLoading: boolean;
  title: string;
  icon: OverridableComponent<SvgIconTypeMap<object, 'svg'>> & {
    muiName: string;
  };
  color: string;
};

function Stats({ data, isLoading, title, icon: Icon, color }: statsProps) {
  return (
    <div
      className={`flex w-full flex-col items-center justify-center gap-1 rounded-3xl border border-border shadow-sm ${color} px-20 py-8`}
    >
      {isLoading ? (
        <DashboardSkeleteon />
      ) : (
        <>
          <div className='mb-4'>
            <Icon fontSize='large' />
          </div>
          <p className='text-center text-xs'>{title}</p>
          <p className='text-3xl font-bold'>
            <CountUp
              start={0}
              end={data}
              duration={2}
              separator=','
              decimals={0}
              decimal=','
            />
          </p>
        </>
      )}
    </div>
  );
}

export default Stats;
