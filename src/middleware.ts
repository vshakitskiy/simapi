import { Redis } from "@upstash/redis"
import { Ratelimit } from "@upstash/ratelimit"
import { NextMiddleware, NextResponse } from "next/server"

const redis = new Redis({
  url: process.env.REDIS_URL as string,
  token: process.env.REDIS_SECRET as string
})

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(1, "1 s")
})

export const config = {
  matcher: ["/api/:path*"]
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
}

export default middleware