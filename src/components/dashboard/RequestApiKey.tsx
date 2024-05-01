"use client"

import { useToast } from "@/hooks/useToast"
import { createApiKey } from "@/lib/actions"
import { ArrowRightSquare, Key, Loader2 as Loader } from "lucide-react"
import { FormEvent, useState } from "react"
import Heading from "@/ui/Heading"
import Paragraph from "@/ui/Paragraph"
import CopyButton from "./CopyButton"
import { Input } from "@/components/ui/Input"
import { Button } from "@/ui/Button"
import { useRouter } from "next/navigation"

const RequestApiKey = () => {
  const [isCreating, setIsCreating] = useState<boolean>(false)
  const [apiKey, setApiKey] = useState<string | null>(null)
  const { toast } = useToast()
  const router = useRouter()

  const createNewApiKey = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsCreating(true)
    try {
      const generatedApiKey = await createApiKey()
      setApiKey(generatedApiKey)
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        })
        return
      }
      toast({
        title: "Error",
        description: "Something went wrong.",
        variant: "destructive",
      })
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="container mad:max-w-2xl">
      <div className="flex flex-col gap-6 items-center">
        <Key className="mx-auto h-12 w-12 text-secondary-foreground" />
        <Heading>
              Request your API key
        </Heading>
        <Paragraph>
              You haven&apos;t requested an API key yet. Request one below.
        </Paragraph>
      </div>

      <form
        onSubmit={createNewApiKey}
        className="mt-6 sm:flex sm:items-center"
        action="#"
      >
        <div className="relative rounded-md shadown-dm sm:min-w-0 sm:flex-1">
          {apiKey ? (
            <CopyButton
              valueToCopy={apiKey} 
              type="button"
              className="absolute insert-y-0 right-0 animate-in fade-in duration-300"
            />
          ) : null}
          <Input
            readOnly
            value={apiKey ?? ""}
            placeholder="Request an API key to get started."
          />
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-4 sm:flex-shrink-0">
          <Button disabled={!!apiKey} className="w-full sm:w-fit flex gap-2">
            {isCreating 
              ? <Loader className="h-4 w-4 animate-spin" /> 
              : null
            }
                Request key
          </Button>
        </div>
      </form>
      {apiKey ? (
        <Button 
          variant="link" 
          className="w-full md:text-lg mt-4 md:mt-6"
          onClick={() => router.refresh()}  
        >
                Continue to dashboard
          <ArrowRightSquare className="ml-2" />
        </Button>
      ) : null}
    </div>
  )
}

export default RequestApiKey