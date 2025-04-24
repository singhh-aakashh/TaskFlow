
import { signIn } from "../../../auth";
import { redirect } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export default function GoogleSignIn() {

  return (

    <form 
      action={async () => {
        "use server"
        await signIn("google",{
            redirect:true,
            redirectTo:"/dashboard"
        })
        
      }}
    >
      <button type="submit" className="w-full flex items-center justify-center gap-2   py-3 rounded-lg font-semibold mb-4">
      <FcGoogle /> Sign in with Google
          </button>
    </form>
  )
} 