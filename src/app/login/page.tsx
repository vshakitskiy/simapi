import GoogleSignIn from "@/components/GoogleSignIn"
import { Button } from "@/components/ui/Button"
import Heading from "@/components/ui/Heading"
import Paragraph from "@/components/ui/Paragraph"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

const LoginPage = () => {
  return (
    <div className="absolute inset-0 mx-auto container flex h-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 max-w-lg">
        <div className="flex flex-col items-center gap-6 text-center">
          <Link href="/">
            <Button
              variant="ghost"
              className="w-fit"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <Heading>
            Welcome back!
          </Heading>
          <Paragraph>
            Please sign in to your account.
          </Paragraph>
          <GoogleSignIn />
        </div>
      </div>
    </div>
  )
}

export default LoginPage