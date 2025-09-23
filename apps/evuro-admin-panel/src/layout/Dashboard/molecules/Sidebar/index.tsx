import { NavLink } from 'react-router-dom';
import {
  webMenuesTypes,
  useDetailDropDown,
  adminPanelMenus,
} from '../../../../../../../libs/db/src';
import { Text } from '../../../../components';
import { useLocation } from 'react-router-dom';
import React, { useMemo } from 'react';

export default function SideBar() {
  const location = useLocation();
  // const [openDetails, setOpenDetails] = useState([false, false]);
  const { toggleDetailSummary, openDetails } = useDetailDropDown();
  // console.log('openDetails Array=========', openDetails);

  // console.log(
  //   '======Location pathName=======',
  //   location.pathname.split('/')[1]
  // );

  // const toggleDropDown = useCallback(
  //   (indexToOpen) => {
  //     setOpenDetails((details) =>
  //       details.map((detail, index) => (index === indexToOpen ? true : false))
  //     );
  //   },
  //   [setOpenDetails]
  // );

  useMemo(() => {
    const indexofDetail = adminPanelMenus
      .slice(4)
      .findIndex(
        (menu: webMenuesTypes) =>
          menu.children[0]?.link.split('/')[1] ===
          location.pathname.split('/')[1]
      );
    // console.log('==========index of Detail  ========', indexofDetail);
    toggleDetailSummary(indexofDetail);
  }, [location]);

  // console.log('admin panel menus =======================', adminPanelMenus);
  // console.log('open details =======================', openDetails);

  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center gap-y-3 mt-8 ">
        <ul className="menu w-full rounded-box reset">
          {adminPanelMenus.map((menu: webMenuesTypes, index: number) =>
            menu.children ? (
              <li
                key={index}
                className={` ${
                  index === adminPanelMenus.length - 4 ? 'mb-[-15px]' : ''
                }`}
                onClick={() => toggleDetailSummary(index - 8)}
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
  );
}
