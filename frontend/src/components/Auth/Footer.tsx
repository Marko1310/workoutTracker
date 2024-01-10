import DarkModeToggle from '../../ui/Application/DarkModeToggle';

function Footer() {
  return (
    <div className='text-text mt-auto flex w-full items-center justify-between align-bottom text-sm'>
      <p className='text-disabled-foreground'>
        © 2023 Marko Čabo. All rights reserved.
      </p>
      <DarkModeToggle />
    </div>
  );
}

export default Footer;
