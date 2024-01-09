import { ReactNode } from 'react';

type homeWrapperProps = {
  children: ReactNode;
};

function HomeWrapper({ children }: homeWrapperProps) {
  return (
    <div className='flex h-full w-full justify-between rounded-xl border-2 border-sky-500 px-2 py-4'>
      {children}
    </div>
  );
}

export default HomeWrapper;
