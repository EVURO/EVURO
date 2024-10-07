import React from 'react';
import { Button } from '../../components';
import { Link, useNavigate } from 'react-router-dom';
import { BiHome, BiLeftArrowAlt } from 'react-icons/bi';

export function NoMatch() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center space-y-10">
      <span className="font-semibold text-2xl tracking-wider text-euvroWhite">
        404: Requested page not found :(
      </span>
      <div className="flex justify-center items-center space-x-5">
        <Button
          onClick={() => navigate(-1)}
          className="bg-euvroWhite hover:bg-[#76d5ef] hover:text-euvroWhite text-xl text-euvroBlack"
        >
          <BiLeftArrowAlt size={20} />
          Go Back
        </Button>
        <Link to="/">
          <Button className="bg-euvroWhite hover:bg-[#76d5ef] hover:text-euvroWhite text-xl text-euvroBlack">
            <BiHome />
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
