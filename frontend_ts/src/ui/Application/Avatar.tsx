import { UserDto } from '../../types/applications';

type AvatarProps = UserDto;

function Avatar({ user }: { user: AvatarProps | null }) {
  return (
    <div className='flex w-auto items-center justify-between gap-4 p-3 md:border-b md:border-border'>
      {/* //TODO: add random image*/}
      <img className='h-10 w-10 rounded-full border-2 border-gray-300 md:h-14 md:w-14' />
      <div className='break-words text-sm md:text-base'>{user?.name}</div>
    </div>
  );
}

export default Avatar;
