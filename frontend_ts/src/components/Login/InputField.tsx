function InputField({ field }: { field: string }) {
  return (
    <>
      <label htmlFor={field}></label>
      <input
        type='text'
        name={field}
        id={field}
        placeholder={field}
        className='h-14 w-full rounded-md border-[1px] border-neutral-400 pl-2 font-montserrat text-lg font-light transition-all focus-within:border-2 hover:border-2 hover:border-neutral-400 focus:border-neutral-600 focus:outline-none'
      />
    </>
  );
}

export default InputField;
