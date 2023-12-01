import { ReactNode } from 'react';

function FormRows({ children }: { children: ReactNode }) {
  return <div className='flex flex-col gap-2'>{children}</div>;
}

export default FormRows;
