import { useEffect, useState } from 'react';
import { images } from './images';

function Background() {
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    setBackgroundImage(images[Math.floor(Math.random() * 7)].img);
  }, []);

  return (
    <div className='p-0'>
      <img
        alt=''
        className='h-full w-full bg-cover bg-center'
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      />
    </div>
  );
}

export default Background;
