import { getToken } from "next-auth/jwt";
import { NextResponse,NextRequest } from "next/server";
import path from "path";

export default async function Middleware(req:any){
    const token = await getToken({req,secret:process.env.JWT_SECRATE!})
    const pathname:string = req.nextUrl.pathname;
    if(pathname.includes("/api/auth") || token){
        return NextResponse.next();
    }

    if(!token && pathname!="/login"){
        return NextResponse.redirect("/login");
    }
}