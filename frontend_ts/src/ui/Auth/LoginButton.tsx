function LoginButton({
  title,
  isSubmitting,
}: {
  title: string;
  isSubmitting: boolean;
}) {
  return (
    <button
      disabled={isSubmitting}
      className={`mt-12 h-14 w-full rounded-md uppercase text-white transition-all ${
        isSubmitting ? 'hover:bg-slate-200' : 'hover:bg-slate-800'
      }
       ${isSubmitting ? 'bg-slate-200' : 'bg-slate-500 '}`}
    >
      {title}
    </button>
  );
}

export default LoginButton;
