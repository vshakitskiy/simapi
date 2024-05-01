import { getSession } from "@/lib/auth"
import { notFound } from "next/navigation"
import db from "@/lib/db"
import RequestApiKey from "@/dashboard/RequestApiKey"
import ApiDashboard from "@/dashboard/ApiDashboard"

const Dashboard = async () => {
  const user = await getSession()
  if (!user) return notFound()

  const apiKey = await db.apiKey.findFirst({
    where: {
      userId: user.user.id,
      enabled: true
    }
  })

  return (
    <div className="max-w-7xl mx-auto mt-16">
      {apiKey ? <ApiDashboard /> : <RequestApiKey />}
    </div>
  )
}

export default Dashboard