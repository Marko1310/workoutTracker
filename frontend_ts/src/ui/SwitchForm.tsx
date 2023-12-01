function SwitchForm({
  formType,
  changeForm,
}: {
  formType: string;
  changeForm: () => void;
}) {
  return (
    <div className='mt-2 flex justify-center gap-2 text-slate-500'>
      <p>{formType === 'login' ? 'Not a member?' : 'Already a member?'}</p>
      <p className='underline hover:cursor-pointer' onClick={changeForm}>
        {formType === 'login' ? 'Signup' : 'Login'}
      </p>
    </div>
  );
}

export default SwitchForm;
