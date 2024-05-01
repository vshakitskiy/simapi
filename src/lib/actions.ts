import { CreateApiData } from "@/types/api"
import axios from "axios"
import db from "@/lib/db"
import { ApiKey } from "@prisma/client"
import { formatDistance } from "date-fns"

export const createApiKey = async () => {
  const { data } = await axios.get<CreateApiData>("/api/v1/key/create")
    
  if (data.error || !data.createdApiKey) {
    if (data.error instanceof Array)
      throw new Error(data.error.join(" "))
        
    throw new Error(data.error ?? "Something went wrong in createApiKey action")
  }

  return data.createdApiKey.key
}

export const revokeApiKey = async (keyId: string) => {
  const { data } = await axios.post<{error?: string}>(
    "/api/v1/key/revoke", 
    {
      keyId
    }
  )
  if (data.error)
    throw new Error(data.error)
}

export const getApiKeys = async (userId: string) => {
  const apiKeys = await db.apiKey.findMany({
    where: {
      userId
    }
  })

  const activeKey = apiKeys.find(key => key.enabled)
  return {
    keys: apiKeys,
    active: activeKey
  }
}

export const getRequests = async (apiKeys: ApiKey[]) => {
  const requests = await db.apiRequest.findMany({
    where: {
      apiKeyId: {
        in: apiKeys.map(key => key.id)
      }
    }
  })

  const serializedRequests = requests.map(req => ({
    ...req,
    timestamp: formatDistance(new Date(req.timestamp), new Date())
  }))

  return serializedRequests
}