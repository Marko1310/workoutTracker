import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDeleteWorkout } from '../../queries/workoutQueries';
import { useNavigate } from 'react-router-dom';

export default function WorkoutMenu({ workoutId }: { workoutId: number }) {
  const { mutate: deleteWorkout, isPending } = useDeleteWorkout();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className=''>
      <Button
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon color='action' />
      </Button>
      <Menu
        sx={{ width: 400 }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem
          sx={{ width: 200 }}
          onClick={() => navigate(`/app/session/${workoutId}`)}
        >
          Start Workout
        </MenuItem>
        <MenuItem onClick={handleClose}>Details</MenuItem>
        <MenuItem onClick={() => deleteWorkout(workoutId)}>Delete</MenuItem>
      </Menu>
    </div>
  );
}
