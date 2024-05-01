import Link from "next/link"
import type { FC } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/ui/DropdownMenu"
import { Button } from "@/ui/Button"
import { Menu } from "lucide-react"
import SingInButton from "@/auth/SingInButton"
import SingOutButton from "@/auth/SingOutButton"
import ThemeToggle from "@/ui/ThemeToggle"
import { Separator } from "@/ui/Separator"
import Logo from "@/components/Logo"
import { getSession } from "@/lib/auth"

type Props = {}

const Navbar: FC<Props> = async ({ }) => {
  const session = await getSession()
  return (
    <header className="fixed backdrop-blur-sm z-50 top-0 left-0 right-0 h-14 border-b border-border shadow-sm flex items-center justify-between">
      <nav className="container max-w-7xl mx-auto w-full flex justify-between items-center">
        <Link href="/">
          <h1 className="text-primary font-bold text-lg lg:text-2xl">
            <Logo className="h-8 w-8" />
          </h1>
        </Link>
        <div className="flex items-center gap-4">
          {session ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger className="md:hidden" asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="fixed -right-5">
                  <DropdownMenuLabel>
                    {session.user.email}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <SingOutButton inDropdown />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="hidden md:flex gap-2">
                <Link href="/dashboard">
                  <Button variant="default">
                    Dashboard
                  </Button>
                </Link>
                <SingOutButton />
              </div>
            </>
          ) : (
            <SingInButton />
          )}
          <Separator orientation="vertical" className="h-10" />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}

export default Navbar