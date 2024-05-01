import { Redis } from "@upstash/redis"
import { Ratelimit } from "@upstash/ratelimit"
import { NextMiddleware, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

const redis = new Redis({
  url: process.env.REDIS_URL as string,
  token: process.env.REDIS_SECRET as string
})

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(1, "1 s")
})

export const config = {
  matcher: ["/", "/login", "/dashboard/:path*", "/api/:path*"]
}

const middleware: NextMiddleware = async (req) => {
  const pathname = req.nextUrl.pathname

  if (pathname.startsWith("/api/v1")) {
    const ip = req.ip ?? "127.0.0.1"
    try {
      const { success } = await ratelimit.limit(ip)

      if (!success)
        return NextResponse.json({ 
          error: "Too many requests me??" 
        }, { status: 429 })

      return NextResponse.next()
    } catch (error) {
      return NextResponse.json({ 
        error: "Internal Server Error" 
      }, { status: 500 })
    }
  }

  const token = await getToken({ req })
  const isAuth = !!token

  const isAuthPage = pathname.startsWith("/login")
  const sensitiveRoutes = ["/dashboard"]

  if (isAuthPage && isAuth)
    return NextResponse.redirect(new URL("/dashboard", req.url), {
      status: 303
    })

  if (!isAuth && sensitiveRoutes.some((route) => pathname.startsWith(route)))
    return NextResponse.redirect(new URL("/login", req.url), {
      status: 303
    })
}

export default middleware