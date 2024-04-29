"use client"

import { useState, type FC } from "react"
import { Button } from "@/ui/Button"
import { Loader2 as Loader } from "lucide-react"
import { signIn, signOut } from "next-auth/react"
import { useToast } from "@/hooks/useToast"
import { cn } from "@/lib/utils"

type Props = {
  inDropdown?: boolean
}

const SingOutButton: FC<Props> = ({ inDropdown }) => {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const googleSignOut = async () => {
    setIsLoading(true)

    try {
      await signOut()
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "Please try again later.",
        variant: "destructive"
      })
      setIsLoading(false)
    }
  }

  return <Button
    variant={inDropdown ? "ghost" : "outline"}
    onClick={googleSignOut}
    disabled={isLoading}
    className={cn("flex gap-2", {
      "w-full justify-start px-2 py-1.5 font-normal text-sm rounded-sm": inDropdown
    })}
  >
    {isLoading 
      ? <Loader className="h-4 w-4 animate-spin" /> 
      : null
    }
    Sign Out
  </Button>
}

export default SingOutButton