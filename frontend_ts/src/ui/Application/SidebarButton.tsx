import { useLocation } from 'react-router-dom';
import NavButton from '../Auth/NavButton';

type SidebarButtonProps = {
  title: string;
  route: string;
};

function SidebarButton({ title, route }: SidebarButtonProps) {
  const location = useLocation();

  return (
    <nav
      className={`${
        location.pathname === route && 'bg-slate-500'
      } flex w-full items-center justify-start gap-8 pl-8 transition-all duration-300 hover:bg-slate-300`}
    >
      <div>icon</div>
      <NavButton title={title} route={route} />
    </nav>
  );
}

export default SidebarButton;
