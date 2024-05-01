import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import db from "@/lib/db"
import { nanoid } from "nanoid"
import { z } from "zod"
import { NextResponse } from "next/server"

export const GET = async (_req: Request, _res: Response) => {
  try {
    const user = await getServerSession(authOptions)
      .then(res => res?.user)
        
    if (!user)
      return NextResponse.json({
        error: "Unauthorized.",
        createdApiKey: null
      }, { status: 401 })

    const existingApiKey = await db.apiKey.findFirst({
      where: {
        userId: user.id,
        enabled: true
      }
    })
        
    if (existingApiKey)
      return NextResponse.json({
        error: "You already have a valid API key.",
        createdApiKey: null
      }, { status: 400 })

    const createdApiKey = await db.apiKey.create({
      data: {
        userId: user.id,
        key: nanoid()
      }
    })

    return NextResponse.json({
      error: null,
      createdApiKey
    }, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError)
      return NextResponse.json({
        error: error.issues,
        createdApiKey: null
      }, { status: 400 })

    return NextResponse.json({
      error: "Something went wrong while creating API key.",
      createdApiKey: null
    }, { status: 500 })
  }
}