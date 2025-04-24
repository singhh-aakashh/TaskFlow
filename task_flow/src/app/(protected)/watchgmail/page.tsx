import { watchGmail } from "@/actions/watch-gmail";
import { useEffect } from "react";

export default function Page(){
    useEffect(()=>{
        watchGmail();
    },[])
    return(
        <>
        <div className="text-xl">watch Gmail</div></>
    )
}