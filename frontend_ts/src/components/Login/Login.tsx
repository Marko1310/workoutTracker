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
      <div className="p-2">
        <div className="flex flex-col">
          <label htmlFor="name"></label>
          <input type="text" name="name" id="name" placeholder="Name" />

          <label htmlFor="email"></label>
          <input type="text" name="email" id="email" placeholder="Email" />

          <label htmlFor="password"></label>
          <input
            type="text"
            name="password"
            id="password"
            placeholder="password"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
