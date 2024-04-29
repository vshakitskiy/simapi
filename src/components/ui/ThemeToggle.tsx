"use client"

import { Laptop, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
 
import { Button } from "@/ui/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/DropdownMenu"
 
const ThemeToggle = () => {
  const { setTheme } = useTheme()
 
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon">
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="flex items-center gap-2" onClick={() => setTheme("light")}>
          <Sun className="h-5 w-5 transition-all" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2" onClick={() => setTheme("dark")}>
          <Moon className="h-5 w-5 transition-all" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2" onClick={() => setTheme("system")}>
          <Laptop className="h-5 w-5 transition-all" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ThemeToggle