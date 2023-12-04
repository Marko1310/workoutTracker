function FormRow({
  type,
  id,
  value,
  onChange,
}: {
  type: string;
  id: string;
  value: string | null;
  onChange: (e: any) => void;
}) {
  return (
    <>
      <label htmlFor={type}></label>
      <input
        type={type}
        id={id}
        placeholder={type}
        className='h-14 w-full rounded-md border-[1px] border-neutral-400 pl-2 font-montserrat text-lg font-light transition-all focus-within:border-2 hover:border-2 hover:border-neutral-400 focus:border-neutral-600 focus:outline-none'
        value={value ?? ''}
        onChange={onChange}
      />
    </>
  );
}

export default FormRow;
