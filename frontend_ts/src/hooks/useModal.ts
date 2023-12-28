export default function useModal(ref: React.RefObject<HTMLDialogElement>) {
  const openModal = () => {
    ref?.current?.showModal();
  };
  const closeModal = () => {
    ref?.current?.close();
  };
  return { openModal, closeModal };
}
