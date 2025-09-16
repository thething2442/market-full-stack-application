// middleware.js
import { NextResponse } from "next/server";
import { auth } from "./auth"; 
export default auth((req) => {
  const { nextUrl } = req;
  const isAuthenticated = !!req.auth;
  const isPublicRoute = nextUrl.pathname === "/sign-up";
  const isProtectedRoute = nextUrl.pathname.startsWith("/dashboard","/settings","mykart","payments-method");

  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/sign-up", nextUrl));
  }
});

// To protect specific paths, export a config object
export const config = {
  matcher: ["/dashboard/:path*"],
};