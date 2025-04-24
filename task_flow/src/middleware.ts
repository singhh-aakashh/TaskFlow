import { NextRequest, NextResponse } from "next/server";
import { auth } from "../auth";

const publicRoutes = [
    "/"
  ];
  
const authRoutes = [
    "/login"
  ];
 

export async function middleware(request:NextRequest){
    const session = await auth();
    const user = session?.user
    const {nextUrl} = request;

    

    const isApiRoute = nextUrl.pathname.startsWith("/api");
    if(isApiRoute) return NextResponse.next();

    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    if(isAuthRoute){
        if(user){
            return NextResponse.redirect(new URL("/dashboard",request.url))
            }
        return NextResponse.next();
    }

    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    if(!user && !isPublicRoute){
        return NextResponse.redirect(new URL("/login",request.url))
    }
    return NextResponse.next();

}

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
  }