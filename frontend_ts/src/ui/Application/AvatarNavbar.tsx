import { UserDto } from '../../types/applications';
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AvatarImage from '@mui/material/Avatar';

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
          <AvatarImage
            sx={{ bgcolor: 'darkorange' }}
            alt={user?.name}
            src='/broken-image.jpg'
          />
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
        </Menu>
      </div>
    </>
  );
}

export default AvatarNavbar;
