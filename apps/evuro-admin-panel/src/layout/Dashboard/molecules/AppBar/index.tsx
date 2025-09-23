import React, { useState } from 'react';
import { Text, Loader, Image } from '../../../../components';
import { NavLink, useNavigate } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';
import {
  adminPanelMenus,
  webMenuesTypes,
  useDetailDropDown,
} from '@evuro-frontend/db';
import {
  useAppSelector,
  useAppDispatch,
  setAlert,
} from '@evuro-frontend/store';
import { loginUserType, Svgs } from '@evuro-frontend/assets';
import { useLogin } from '@evuro-frontend/hooks';

export default function AppBar() {
  const [nav, setNav] = useState(false);
  const [logoutColor, setLogoutColor] = useState(false);

  console.log('====logout Color======', logoutColor);

  const loginUser: loginUserType = useAppSelector(
    (state) => state.user.loginData
  );
  const navigate = useNavigate();
  const { toggleDetailSummary, openDetails } = useDetailDropDown();
  const dispatch = useAppDispatch();
  // console.log('login User Data===========', loginUser);
  const { handleLogout } = useLogin({ resolve: logoutFunction });

  function logoutFunction(response: any) {
    // response status
    if (response?.data?.status === 200) {
      navigate('/login');
      dispatch(
        setAlert({
          visible: true,
          message: response?.data?.message,
          variant: 'success',
        })
      );
    } else {
      navigate('/login')
      dispatch(
        setAlert({
          visible: true,
          message: response?.error?.data?.message,
          variant: 'error',
        })
      );
    }
  }

  return (
    <div className="flex flex-row px-[5%] h-full items-center justify-between">
      {/* First section */}
      <section className="cursor-pointer col-span-2 flex items-center">
        <div className="hidden lg:block">
          <img
            src={Svgs.authDogLogo}
            className="w-full h-[55px] object-cover "
            alt="logo"
          />
        </div>
        <div className="block lg:hidden">
          <GiHamburgerMenu size={22} onClick={() => setNav(!nav)} />
        </div>
      </section>
      {/* Second section */}
      <section className="col-span-10 flex flex-row justify-between items-center">
        {/* UserProfile Div */}
        <div className="flex flex-row gap-1.5">
          <div>
            <Text className="text-euvroBlack text-[10px] md:text-[12px] font-normal leading-[15px] text-left">
              {loginUser?.data?.name}
            </Text>
            <Text className="text-[10px] md:text-[12px] text-euvroBlack  font-normal leading-[15px] text-left">
              {loginUser?.data?.email}
            </Text>
          </div>

          {/* User Profile Name  */}
          <div className="dropdown dropdown-bottom dropdown-end">
            <div tabIndex={0} className="cursor-pointer avatar online">
              <div className="w-9 rounded-full">
                <Image url={loginUser?.data?.profileImage} />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu mt-[-2] p-2 shadow bg-base-100  rounded-box w-40 md:w-48"
            >
              <li>
                <Text
                  className="flex flex-row items-center justify-start font-normal text-[13px] md:text-[15px] leading-[27px] text-lightGray hover:bg-darkBlue hover:text-euvroWhite "
                  onClick={handleLogout}
                  onMouseEnter={() => setLogoutColor(true)}
                  onMouseLeave={() => setLogoutColor(false)}
                >
                  {logoutColor ? (
                    <img
                      src={Svgs.webDropDownHoverLogout}
                      alt="logout Hover"
                      className="w-[24px] h-[24px]"
                    />
                  ) : (
                    <img
                      src={Svgs.webDropDownLogout}
                      alt="logout"
                      className="w-[24px] h-[24px]"
                    />
                  )}{' '}
                  Logout
                </Text>
              </li>
            </ul>
          </div>
        </div>
      </section>
      {/* Overlay  */}
      {nav && (
        <div className=" fixed w-full h-screen bg-black/70 top-0 left-0 z-10 duration-300"></div>
      )}
      {/* Sm Screen SideBar Menu */}
      <div
        className={
          nav
            ? 'fixed top-0 left-0 bg-euvroWhite z-20 w-[280px]  h-screen pt-24  duration-300'
            : 'fixed top-0 left-[-100%] bg-euvroWhite z-10 w-[280px]  h-screen pt-24 duration-300'
        }
      >
        <AiOutlineClose
          size={30}
          className="absolute right-4 top-4 cursor-pointer"
          onClick={() => setNav(!nav)}
        />
        <div className="flex flex-col items-center justify-center gap-y-3 mt-8">
          <ul className="menu w-full rounded-box reset">
            {adminPanelMenus.map((menu: webMenuesTypes, index: number) =>
              menu.children ? (
                <li
                  key={index}
                  className={` ${
                    index === adminPanelMenus.length - 2 ? '  mt-[-16px]' : ''
                  }`}
                  onClick={() => toggleDetailSummary(index - 4)}
                >
                  <details open={openDetails[index - 4]}>
                    <summary>
                      <img src={menu.svg} alt={menu.link} className="w-5" />
                      <Text className="w-[75%]">{menu.name}</Text>
                    </summary>
                    <ul>
                      {menu.children?.map(
                        (subMenu: webMenuesTypes, subMenuIndex: number) => (
                          <li key={subMenuIndex}>
                            <NavLink to={subMenu.link}>{subMenu.name}</NavLink>
                          </li>
                        )
                      )}
                    </ul>
                  </details>
                </li>
              ) : (
                <li key={index}>
                  <NavLink to={menu.link}>
                    <img src={menu.svg} alt={menu.link} className="w-5" />
                    <Text className="w-[75%]">{menu.name}</Text>
                  </NavLink>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
