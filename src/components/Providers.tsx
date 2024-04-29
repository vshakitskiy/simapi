"use client"

import type { FC, PropsWithChildren } from "react"
import { ThemeProvider } from "next-themes"
import { SessionProvider } from "next-auth/react"

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider
      attribute="class"
      enableSystem
      defaultTheme="system"
    >
      <SessionProvider>
        {children}
      </SessionProvider>
    </ThemeProvider>
  )
}

export default Providers