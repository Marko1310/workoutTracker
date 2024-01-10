import { useEffect, useState } from 'react';
import { images } from './images';

function Image() {
  const [image, setImage] = useState('');

  useEffect(() => {
    setImage(images[Math.floor(Math.random() * 7)].img);
  }, []);

  return (
    <div
      className='hidden h-full w-full bg-cover bg-center md:block'
      style={{
        backgroundImage: `url(${image})`,
      }}
    />
  );
}

export default Image;
