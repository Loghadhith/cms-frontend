"use client";

import SideBar from "../components/sidebar";


const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {" "}
      <div className="h-full relative">
        <div className="hidden md:flex md:fixed md:flex-col h-full md:w-80 md:inset-y-0 bg-gray-900 z-[80]">
          <div className="">
            <SideBar />
          </div>
        </div>
        <div className="md:pl-80 h-screen w-full ">
          {children}
        </div>
      </div>
    </>
  );
};

export default RootLayout;

