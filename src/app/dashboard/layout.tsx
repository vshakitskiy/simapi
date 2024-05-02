import { getSession } from "@/lib/auth"
import type { FC, PropsWithChildren } from "react"
import { redirect } from "next/navigation"

const DashboardLayout: FC<PropsWithChildren> = async ({ children }) => {
  const session = await getSession()

  if (!session)
    redirect("/login")
  
  return (
    <section className="pt-20">
      {children}
    </section>
  )
}

export default DashboardLayout