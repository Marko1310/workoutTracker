import { Link } from 'react-router-dom';

type NavButtonProps = {
  title: string;
  route: string;
};

function NavButton({ title, route }: NavButtonProps) {
  return (
    <Link to={`${route}`} className='flex h-14 w-full items-center'>
      {title}
    </Link>
  );
}

export default NavButton;
