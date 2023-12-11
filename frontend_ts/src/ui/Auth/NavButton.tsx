import { useNavigate } from 'react-router-dom';
type NavButtonProps = {
  title: string;
  route: string;
};

function NavButton({ title, route }: NavButtonProps) {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(`./${route}`)} className='h-14'>
      {title}
    </button>
  );
}

export default NavButton;
