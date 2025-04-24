import GoogleSignIn from "@/components/app_component/googleSignin";
import { LoginComponent } from "@/components/app_component/login";
import Image from "next/image";

export default function Login(){
    return(
        <div className="flex w-screen h-screen">
            <div className="flex flex-col items-center justify-center w-1/2 space-y-8">
        <h1 className="text-4xl">Login page</h1>
        <LoginComponent/>
        <GoogleSignIn/>
        </div>
        {/* 746X762 */}
        <div className="w-1/2  flex items-center justify-center">
        <p className="text-7xl font-medium">Build powerful workflows incredibly fast...</p>
      </div>
        </div>

    )
}