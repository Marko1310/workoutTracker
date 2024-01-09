import { UserDto } from '../../types/applications';
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DarkModeToggle from './DarkModeToggle';

type AvatarProps = { user?: UserDto | null; logout: () => void };

function AvatarNavbar({ user, logout }: AvatarProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className=''>
        <Button
          id='user-button'
          aria-controls={open ? 'user-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          color='inherit'
        >
          {/* //TODO: add random image*/}
          <img className='h-10 w-10 rounded-full border-2 border-gray-300 md:h-14 md:w-14' />
        </Button>
        <Menu
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          id='user-menu'
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'user-button',
          }}
        >
          <MenuItem sx={{ width: 150 }} onClick={logout}>
            Logout
          </MenuItem>
          <MenuItem sx={{ width: 120, gap: 6 }} onClick={handleClose}>
            Toogle <DarkModeToggle />
          </MenuItem>
        </Menu>
      </div>
    </>
  );
}

export default AvatarNavbar;
