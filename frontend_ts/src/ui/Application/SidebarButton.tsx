import NavButton from '../Auth/NavButton';

type SidebarButtonProps = {
  title: string;
  route: string;
};

function SidebarButton({ title, route }: SidebarButtonProps) {
  return (
    <div className='flex w-full flex-row items-center justify-start gap-4 px-8 transition-all duration-300 hover:bg-slate-500'>
      <div>icon</div>
      <NavButton title={title} route={route} />
    </div>
  );
}

export default SidebarButton;
