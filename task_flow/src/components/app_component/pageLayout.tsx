"use client"
import UserAvatar from "./userAvatar";
import { UserProvider } from "@/lib/store/userStore";
import Sidebar from "./sidebar";


const PageLayout = ({ children ,session ,id}: { children: React.ReactNode,session:any,id:any }) => {
  return (
    <UserProvider user={{...session?.user,id:id}}>
    <main className="h-screen w-full flex items-center justify-center flex-col" suppressHydrationWarning>
      <header className="fixed right-0 left-0 top-0 py-4 px-4 bg-black  z-[100] flex items-center justify-between  space-x-10">
          <div className=" flex space-x-4">
          <img src="/fuzzieLogo.png" className="w-5 ml-5 pt-2" />
        <p className="text-xl sm:text-3xl font-bold relative z-1 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 ">
        Task Flow
      </p>
      </div>
      <UserAvatar/>
            </header>
<aside id="logo-sidebar" className="fixed top-0 left-0 bg-black z-40 w-20 h-screen pt-20 " aria-label="Sidebar">
  <Sidebar/>
</aside>

      <div className="bg-black w-full h-full pt-20 pl-20">
        <div className="w-full h-full border-l-2  border-t-2 rounded-tl-3xl">
          {children}
        </div>
      </div>
    </main>
    </UserProvider>
  );
};

export default PageLayout;
