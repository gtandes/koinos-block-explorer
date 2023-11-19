"use client";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { redirect } from "next/navigation";

export function middleware(request: NextRequest) {
  const protectedRoutes = ["/search", "/network"];
  // const { connectedAccount } = walletConnectStore();

  // const url = request.nextUrl.clone();
  // if (!!connectedAccount && url.pathname !== "/") {
  //   url.pathname = "/";
  //   return NextResponse.redirect(url);
  // }

  // if (!process.env.NEXT_WHITELISTED_ACCOUNTS?.includes(connectedAccount)) {
  //   const absoluteUrl = new URL("/", request.nextUrl.origin);
  //   return NextResponse.redirect(absoluteUrl.toString());
  // }

  return NextResponse.next();
}

// create reusable function for pulling current connected account then checking if it is included in the array of whitelisted accounts
