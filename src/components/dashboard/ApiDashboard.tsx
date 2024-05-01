import { getApiKeys, getRequests } from "@/lib/actions"
import { getSession } from "@/lib/auth"
import { notFound } from "next/navigation"
import Heading from "@/ui/Heading"
import Paragraph from "@/ui/Paragraph"
import { Input } from "@/components/ui/Input"
import DataTable from "./DataTable"
import { columns } from "@/constants/requestColumns"
import ApiKeyOptions from "./ApiKeyOptions"

const ApiDashboard = async () => {
  const session = await getSession()
  if (!session) notFound()
  const { user: { id, name } } = session

  const { 
    keys: apiKeys, 
    active: activeKey 
  } = await getApiKeys(id)
  if (!activeKey) notFound()

  const requests = await getRequests(apiKeys)

  return (
    <div className="container flex flex-col gap-6">
      <Heading>
        Welcome back, {name}
      </Heading>
      <div className="flex flex-col md:flex-row gap-2 justify-center md:justify-start items-center">
        <Paragraph className="mb-0 mr-2">
          Your API key
        </Paragraph>
        <Input
          className="truncate w-full sm:max-w-lg md:max-w-sm" 
          readOnly 
          value={activeKey.key} 
        />
        <ApiKeyOptions
          apiKeyId={activeKey.id}
          apiKey={activeKey.key}
        />
      </div>
      <Paragraph className="text-center md:text-left mt-4 -mb-4">
        Your API history
      </Paragraph>
      {/* TODO: normal data table features */}
      <DataTable 
        columns={columns}
        data={requests}
      />
    </div>
  )
}

export default ApiDashboard