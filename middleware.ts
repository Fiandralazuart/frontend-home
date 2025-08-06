import { NextRequest, NextResponse } from "next/server";
import { JWTExtended } from "./types/auth";
import { getToken } from "next-auth/jwt";
import environment from "./config/environment";
import path from "path";

// NextRequest digunakan untuk mengakses informasi tentang request yang dilakukan user

export async function middleware(request: NextRequest) {
	console.log("middleware success")
	const token: JWTExtended | null = await getToken({
		req: request,
		secret: environment.SECRET
	})
	const { pathname } = request.nextUrl
	console.log("dataToken", token)

	if(pathname === "/auth/login" || pathname === "/auth/register"){
		if(token){
			return NextResponse.redirect(new URL("/", request.url))
		}
	}
	if(pathname.startsWith("/admin")) {
		if(!token) {
			const url = new URL("/auth/login", request.url)
			url.searchParams.set("callbackUrl", encodeURI(request.url))
			return NextResponse.redirect(url)
		}

		if(token?.user?.role !== "admin"){
			return NextResponse.redirect(new URL("/", request.url))
		}

		if(pathname === "/admin"){
			return NextResponse.redirect(new URL("/admin/accomodation", request.url))
		}
	}
	if(pathname.startsWith("/member")) {
		if(!token) {
			const url = new URL("/auth/login")
			url.searchParams.set("callbackUrl", encodeURI(request.url))
			return NextResponse.redirect(url)
		}
		if(pathname === "/member"){
			return NextResponse.redirect("/member")
		}
	}
}

export const config = {
	matcher: ["/auth/:path*", "/admin/:path*", "/member/:path*"]
}