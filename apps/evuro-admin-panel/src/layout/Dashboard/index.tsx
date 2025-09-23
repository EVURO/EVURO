import React from 'react';
import AppBar from './molecules/AppBar';
import SideBar from './molecules/Sidebar';
import { Outlet } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="bg-dashboardLayoutBackground flex flex-col gap-5">
      <section className="bg-euvroWhite h-20">
        <AppBar />
      </section>
      <main className="min-h-screen h-auto flex flex-row justify-center gap-7">
        <section className="w-1/6  hidden lg:block bg-euvroWhite rounded-r-[10px]">
          <SideBar />
        </section>

        <section className="w-11/12 md:w-10/12 rounded-tl-[10px] sm:mx-6 md:mr-6 lg:ml-0 lg:mr-5">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
