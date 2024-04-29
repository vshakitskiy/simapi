"use client"

import { useState, type FC } from "react"
import { Button } from "@/ui/Button"
import { Loader2 as Loader } from "lucide-react"
import { signIn } from "next-auth/react"
import { useToast } from "@/hooks/useToast"

type Props = {}

const SingInButton: FC<Props> = ({ }) => {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const googleSignIn = async () => {
    setIsLoading(true)

    try {
      await signIn("google")
    } catch (error) {
      toast({
        title: "Error signing in",
        description: "Please try again later.",
        variant: "destructive"
      })
      setIsLoading(false)
    }
  }

  return <Button
    onClick={googleSignIn}
    disabled={isLoading}
    className="flex gap-2"
  >
    {isLoading 
      ? <Loader className="h-4 w-4 animate-spin" /> 
      : null
    }
    Sign In
  </Button>
}

export default SingInButton