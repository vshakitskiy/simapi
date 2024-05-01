import { ApiKey } from "@prisma/client"
import type { ZodIssue } from "zod"

export type CreateApiData = {
    error: string | ZodIssue[] | null
    createdApiKey: ApiKey | null
}

export type RevokeApiData = {
    error: string | ZodIssue[] | null
    success: boolean
}