"use client"

import type { ButtonHTMLAttributes, FC } from "react"
import { Button } from "@/ui/Button"
import { useToast } from "@/hooks/useToast"
import { Copy } from "lucide-react"

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    valueToCopy: string
}

const CopyButton: FC<Props> = ({
  valueToCopy,
  className,
  ...props
}) => {
  const { toast } = useToast()

  return (
    <Button
      {...props}
      className={className}
      onClick={() => {
        navigator.clipboard.writeText(valueToCopy)
        toast({
          title: "Copied!",
          description: "API key copied to clipboard."
        })
      }}
      variant="ghost"
    >
      <Copy className="h-5 w-5" />
    </Button>
  )
}

export default CopyButton