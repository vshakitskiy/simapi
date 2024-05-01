import { NextApiHandler } from "next"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import db from "@/lib/db"
import { z } from "zod"

export const POST = async (_req: Request, _res: Response) => {
  try {
    const user = await getServerSession(authOptions)
    .then(res => res?.user)

  if (!user)
    return NextResponse.json({
      error: "Unauthorized.",
      sucess: false
    }, { status: 401 })
  
  const validApiKey = await db.apiKey.findFirst({
    where: {
      userId: user.id,
      enabled: true
    }
  })

  if (!validApiKey)
    return NextResponse.json({
      error: "You don't have an active API key.",
      sucess: false
    }, { status: 500 })

  await db.apiKey.update({
    where: {
      id: validApiKey.id
    },
    data: {
      enabled: false
    }
  })

  return NextResponse.json({
    error: null,
    success: true
  }, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError)
      return NextResponse.json({
        error: error.issues,
        success: false
      }, { status: 400 })

    return NextResponse.json({
      error: "Something went wrong while revoking API key.",
      success: false
    }, { status: 500 })
  }
 
}