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
      className={`mt-12 h-14 w-full rounded-md bg-slate-400 uppercase text-white transition-all hover:${
        isSubmitting ? 'bg-slate-200' : 'bg-slate-800'
      } ${isSubmitting ? 'bg-slate-200' : ''}`}
    >
      {title}
    </button>
  );
}

export default LoginButton;
