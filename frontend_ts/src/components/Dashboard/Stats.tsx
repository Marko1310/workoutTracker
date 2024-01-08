import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import CountUp from 'react-countup';

type statsProps = {
  data: number;
  title: string;
  icon: OverridableComponent<SvgIconTypeMap<object, 'svg'>> & {
    muiName: string;
  };
  color: string;
};

function Stats({ data, title, icon: Icon, color }: statsProps) {
  return (
    <div
      className={`flex w-full flex-col items-center justify-center gap-1 rounded-3xl border-0 ${color} px-20 py-8`}
    >
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
    </div>
  );
}

export default Stats;
