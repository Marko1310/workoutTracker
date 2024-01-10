import { forwardRef } from 'react';
import useModal from '../../hooks/useModal';

type Props = {
  children: React.ReactNode;
};

const Modal = forwardRef<HTMLDialogElement, Props>(({ children }, ref) => {
  const { closeModal } = useModal(ref as React.RefObject<HTMLDialogElement>);

  return (
    <dialog
      className='text-text relative max-w-max rounded-md bg-foreground pt-6 backdrop:bg-black/20 backdrop:backdrop-blur-sm'
      ref={ref}
    >
      <button
        className='hover:text-destructive-foreground absolute right-4 top-2 text-base font-extrabold text-destructive ease-out hover:cursor-pointer'
        onClick={closeModal}
      >
        X
      </button>
      {children}
    </dialog>
  );
});

export default Modal;
