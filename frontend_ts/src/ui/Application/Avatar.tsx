import { UserDto } from '../../types/applications';
import AvatarImage from '@mui/material/Avatar';

type AvatarProps = UserDto;

function Avatar({ user }: { user: AvatarProps | null }) {
  return (
    <div className='flex w-auto items-center justify-between gap-4 p-3 md:border-b md:border-border'>
      <AvatarImage
        sx={{ bgcolor: 'darkorange' }}
        alt={user?.name}
        src='/broken-image.jpg'
      />
      <div className='break-words text-sm md:text-base'>{user?.name}</div>
    </div>
  );
}

export default Avatar;
