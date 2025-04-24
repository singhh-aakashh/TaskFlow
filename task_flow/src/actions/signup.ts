"use server"; 
import { formLoginSchema } from "@/components/app_component/login";
import { z } from "zod";
import { signIn, signOut } from "../../auth";

export const signInUser =async (values:z.infer<typeof formLoginSchema>)=>{
    
  try {
    console.log("User signing in...");

    const user = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (user?.error) {
        console.error("Sign-in failed:", user.error);
        return { error: user.error };
      }

    console.log("Sign-in response:", user);
    return true;
  } catch (error) {
    console.error("Sign-in error:", error);
    return { error: "Sign-in failed" };
  }
}

export const googleSignin = async () =>{
    try {
        await signIn("google")
        return true;
    } catch (error) {
        console.log(error)
    }
}

export const userSignout = async () =>{
  await signOut({
    redirect:true,
    redirectTo:"/login"
});
}

