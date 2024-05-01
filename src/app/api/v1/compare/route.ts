import { NextResponse } from "next/server"
import { z } from "zod"
import db from "@/lib/db"
import { cosineSimilarity } from "@/lib/compare"
import { headers } from "next/headers"
import axios from "axios"

const reqSchema = z.object({
  text1: z.string().max(1000),
  text2: z.string().max(1000)
})

const url = "https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2"

export const POST = async (req: Request, _res: Response) => {
  try {
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
        const { data } = await axios.post<number[]>(url, {
          inputs: text
        }, {
          headers: {
            Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`
          }
        })
        return data
      })
    )
  
    const similarity = cosineSimilarity(embeddings[0], embeddings[1])
    console.log(similarity)
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
      error: "Internal server error. Something went wrong while comparing text."
    }, { status: 500 })
  }
}