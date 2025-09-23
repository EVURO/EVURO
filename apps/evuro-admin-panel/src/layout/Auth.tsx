import { Svgs } from '@evuro-frontend/assets';
import { Outlet } from 'react-router-dom';

function Auth() {
  return (
    <div className="flex flex-row rounded-xl items-center justify-center h-screen ">
      <div className="flex flex-col items-center justify-center w-[50%] h-[100%] rounded-xl bg-transparent">
        <Outlet />
      </div>
      <div className="hidden sm:hidden  lg:flex flex-col items-center rounded-xl w-[50%] h-[100%]  ">
        <img
          src={Svgs.authImage}
          alt="card"
          className="object-cover h-full w-full"
        />
      </div>
    </div>
  );
}

export default Auth;
