import type { Metadata } from "next"
import type { FC, PropsWithChildren } from "react"
import { Inter } from "next/font/google"
import Providers from "@/components/Providers"
import "@/app/globals.css"
import Navbar from "@/components/Navbar"
import { Toaster } from "@/ui/Toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Simapi",
  description: "Text Similarity API",
  icons: {
    icon: "/icon.svg"
  }
}

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Navbar />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
