import { userSignout } from "@/actions/signup"
import { signOut } from "../../../auth"

export default function Logout(){
    return (
        <form
          action={async () => {
           await userSignout() 
          }}
        >
          <button type="submit">Sign Out</button>
        </form>
      )
}