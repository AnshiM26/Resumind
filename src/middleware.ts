import { createRouteMatcher,clerkMiddleware } from "@clerk/nextjs/server";

const isPublicRoute=createRouteMatcher(["/","/sign-in(.*)","/sign-up(.*)"]);

export default clerkMiddleware(async (auth,request)=>{
    if(!isPublicRoute(request)){
        await auth.protect()
    }
    console.log('Request URL:', request.url);
console.log('Is public route:', isPublicRoute(request));
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};