import { ReactNode } from 'react';

type homeWrapperProps = {
  children: ReactNode;
};

function HomeWrapper({ children }: homeWrapperProps) {
  return (
    <div className='flex h-full w-full justify-between rounded-xl border border-border bg-foreground px-1 py-4 shadow-sm lg:px-4'>
      {children}
    </div>
  );
}

export default HomeWrapper;
