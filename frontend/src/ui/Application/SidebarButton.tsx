import { useLocation } from 'react-router-dom';
import NavButton from '../Auth/NavButton';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';

type SidebarButtonProps = {
  title: string;
  route: string;
  icon: OverridableComponent<SvgIconTypeMap<object, 'svg'>> & {
    muiName: string;
  };
};

function SidebarButton({ title, route, icon: Icon }: SidebarButtonProps) {
  const location = useLocation();

  return (
    <nav
      className={`${
        location.pathname === route && 'bg-hover-select hover:bg-hover-select'
      } hover:bg-hover flex w-full items-center justify-start gap-8 pl-8 transition-all duration-300`}
    >
      <Icon color='warning' />
      <NavButton title={title} route={route} />
    </nav>
  );
}

export default SidebarButton;
