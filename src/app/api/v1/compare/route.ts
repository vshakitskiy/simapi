import { NextApiHandler } from "next"
import { NextResponse } from "next/server"
import { z } from "zod"
import db from "@/lib/db"
import { openai } from "@/lib/openai"
import { cosineSimilarity } from "@/lib/compare"
import { headers } from "next/headers"

const reqSchema = z.object({
  text1: z.string().max(1000),
  text2: z.string().max(1000)
})

export const POST = async (req: Request, _res: Response) => {
  try {1
    const apiKey = headers().get("authorization")
    if (!apiKey)
      return NextResponse.json({
        error: "Unauthorized."
      }, { status: 401 })
    
    const body = await req.json()
    const { text1, text2 } = reqSchema.parse(body)

    const validApiKey = await db.apiKey.findFirst({
      where: {
        key: apiKey,
        enabled: true
      }
    })

    if (!validApiKey)
      return NextResponse.json({
        error: "Unauthorized."
      }, { status: 401 })

    const start = new Date()
    const embeddings = await Promise.all(
      [text1, text2].map(async text => {
        const res = await openai.embeddings.create({
          model: "text-embedding-ada-002",
          input: text
        })

        return res.data[0].embedding
      })
    )
    const similarity = cosineSimilarity(embeddings[0], embeddings[1])
    const duration = new Date().getTime() - start.getTime()

    await db.apiRequest.create({
      data: {
        duration,
        method: req.method as string,
        path: req.url as string,
        status: 200,
        apiKeyId: validApiKey.id,
        usedApiKey: validApiKey.key
      }
    })

    return NextResponse.json({
      success: true,
      text1,
      text2,
      similarity
    }, {
      status: 200
    })
  } catch (error) {
    if (error instanceof z.ZodError)
      return NextResponse.json({
        error: error.issues,
      }, { status: 400 })

    console.log(error)

    return NextResponse.json({
      error: "Internal server error. Something went wrong while comparing text.",
      message: error
    }, { status: 500 })
  }
}