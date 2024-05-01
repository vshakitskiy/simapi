"use client"

import { useToast } from "@/hooks/useToast"
import { cn } from "@/lib/utils"
import { Button } from "@/ui/Button"
import { Loader2 as Loader } from "lucide-react"
import { signIn } from "next-auth/react"
import { useState } from "react"
import Google from "./Google"

const GoogleSignIn = () => {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const loginWithGoogle = async () => {
    setIsLoading(true)

    try {
      await signIn("google")
    } catch (error) {
      toast({
        title: "Error signing in",
        description: "Please try again later.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={loginWithGoogle} 
      className="max-w-xs md:max-w-sm lg:max-w-md w-full"
      disabled={isLoading}
    >
      {isLoading
        ? <Loader className="mr-2 animate-spin h-4 w-4" /> 
        : <Google className="mr-2 h-4 w-4" />
      }
            Google
    </Button>
  )
}

export default GoogleSignIn