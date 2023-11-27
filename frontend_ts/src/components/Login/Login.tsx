import { useEffect, useState } from 'react';
import { images } from './images';

function Login() {
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    setBackgroundImage(images[Math.floor(Math.random() * 7)].img);
  }, []);

  return (
    <div className="h-screen w-screen grid grid-cols-[1.5fr,1fr] overflow-y-hidden bg-white">
      <div className="p-0">
        <img
          alt=""
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${backgroundImage})`
          }}
        />
      </div>
    </div>
  );
}

export default Login;
