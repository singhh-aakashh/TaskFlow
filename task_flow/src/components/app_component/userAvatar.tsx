"use client"
import { useUser } from "@/lib/store/userStore";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import Logout from "./logout";
import { useEffect, useState } from "react";
import Image from "next/image";


export default  function UserAvatar() {
  const user:any = useUser();
    const [userPic,setUserPic]=useState<string|undefined>()
    const [userName , setUserName] = useState<string>()
    useEffect(()=>{
    setUserPic(user?.image ? user.image : undefined)
    setUserName(user?.email ? user.email.charAt(0).toUpperCase() : "A")
    console.log(user)
    },[])
  console.log(userPic)
  
  return (
    <DropdownMenu>
         <DropdownMenuTrigger asChild>
      <button type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
        { userPic? <Image className="w-10 h-10 rounded-full" width={1000} height={1000} src={userPic} alt="Rounded avatar"/>: <span className="font-medium text-gray-600 dark:text-gray-300">{userName}</span>} 
      </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-4 mr-2 w-56">
        <DropdownMenuLabel><Logout/></DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
