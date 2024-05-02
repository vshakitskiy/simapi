import { getSession } from "@/lib/auth"
import { FC, PropsWithChildren } from "react"
import { redirect } from "next/navigation"

const LoginLayout: FC<PropsWithChildren> = async ({
  children
}) => {
  const session = await getSession()

  if (session)
    redirect("/dashboard")

  return (
    <>
      {children}
    </>
  )
}

export default LoginLayout