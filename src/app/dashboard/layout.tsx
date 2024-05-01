import type { FC, PropsWithChildren } from "react"

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <section className="pt-20">
      {children}
    </section>
  )
}

export default DashboardLayout