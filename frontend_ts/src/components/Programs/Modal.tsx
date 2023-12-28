import { forwardRef } from 'react';
import useModal from '../../hooks/useModal';

type Props = {
  children: React.ReactNode;
};

const Modal = forwardRef<HTMLDialogElement, Props>(({ children }, ref) => {
  const { closeModal } = useModal(ref as React.RefObject<HTMLDialogElement>);

  return (
    <dialog ref={ref}>
      {children}
      <button onClick={closeModal}>Close</button>
    </dialog>
  );
});

export default Modal;
