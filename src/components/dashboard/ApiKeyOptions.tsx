"use client"

import { useState, type FC } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/DropdownMenu"
import { Button } from "../ui/Button"
import { Loader2 as Loader } from "lucide-react"
import { useToast } from "@/hooks/useToast"
import { useRouter } from "next/navigation"
import { createApiKey, revokeApiKey } from "@/lib/actions"

type Props = {
  apiKeyId: string
  apiKey: string
}

const ApiKeyOptions: FC<Props> = ({
  apiKeyId,
  apiKey
}) => {
  const { toast } = useToast()
  const [isCreating, setIsCreating] = useState<boolean>(false)
  const [isRewoking, setIsRewoking] = useState<boolean>(false)
  const router = useRouter()

  const createNewApiKey = async () => {
    setIsCreating(true)

    try {
      await revokeApiKey(apiKeyId)
      await createApiKey()
      router.refresh()
    } catch (error) {
      toast({
        title: "Error creating API key",
        description: "Please try again later.",
        variant: "destructive"
      })
    } finally {
      setIsCreating(false)
    }
  }

  const revokeCurrentApiKey = async () => {
    setIsRewoking(true)

    try {
      await revokeApiKey(apiKeyId)
      router.refresh()
    } catch (error) {
      toast({
        title: "Error revoking API key",
        description: "Please try again later.",
        variant: "destructive"
      })
    } finally {
      setIsRewoking(false)
    }
  }
        
  return (
    <DropdownMenu>
      <DropdownMenuTrigger 
        disabled={isCreating || isRewoking}
        asChild
      >
        <Button variant="secondary" className="flex gap-2 items-center w-full sm:max-w-lg md:w-fit">
          {isCreating || isRewoking ? (
            <Loader className="animate-spin h-4 w-4" />
          ) : null}
          <p>
            {isCreating
              ? "Creating new key" 
              : isRewoking 
                ? "Revoke key" 
                : "Options"
            }
          </p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            navigator.clipboard.writeText(apiKey)
            toast({
              title: "Copied!",
              description: "API key copied to clipboard."
            })
          }}
        >
          Copy
        </DropdownMenuItem>
        <DropdownMenuItem onClick={createNewApiKey}>
          Create new key
        </DropdownMenuItem>
        <DropdownMenuItem onClick={revokeCurrentApiKey}>
          Revoke key
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ApiKeyOptions