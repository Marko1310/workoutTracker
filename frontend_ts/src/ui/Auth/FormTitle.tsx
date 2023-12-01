function FormTitle({ formType }: { formType: string }) {
  return (
    <h3 className='mb-6 flex justify-center text-4xl font-thin'>
      {formType === 'login' ? 'Login' : 'Signup'}
    </h3>
  );
}

export default FormTitle;
