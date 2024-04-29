import { forwardRef, type HTMLAttributes } from "react"
import { cva, VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const ParagraphVariants = cva(
  "max-w-prose text-primary mb-2 text-center",
  {
    variants: {
      size: {
        default: "text-base sm:text-lg",
        sm: "text-sm sm:text-base",
      }
    },
    defaultVariants: {
      size: "default"
    }
  }
)

export interface ParagraphProps
  extends HTMLAttributes<HTMLParagraphElement>,
  VariantProps<typeof ParagraphVariants> { }

const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(({
  className, size, children, ...props
}, ref) => {
  return (
    <p
      ref={ref}
      {...props}
      className={cn(ParagraphVariants({ size, className }))}
    >
      {children}
    </p>
  )
})

Paragraph.displayName = "Paragraph"

export default Paragraph