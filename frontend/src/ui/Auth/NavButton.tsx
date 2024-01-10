import { Link } from 'react-router-dom';

type NavButtonProps = {
  title: string;
  route: string;
  toggle: () => void;
};

function NavButton({ title, route, toggle }: NavButtonProps) {
  return (
    <Link
      onClick={toggle}
      to={`${route}`}
      className='flex h-14 w-full items-center'
    >
      {title}
    </Link>
  );
}

export default NavButton;
