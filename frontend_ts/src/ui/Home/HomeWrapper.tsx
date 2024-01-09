import { ReactNode } from 'react';

type homeWrapperProps = {
  children: ReactNode;
};

function HomeWrapper({ children }: homeWrapperProps) {
  return (
    <div className='flex h-full w-full justify-between rounded-xl border border-border bg-foreground px-4 py-4 shadow-sm'>
      {children}
    </div>
  );
}

export default HomeWrapper;
