"use client"

import type { FC } from "react"
import Heading from "@/ui/Heading"
import Paragraph from "@/ui/Paragraph"
import SimpleBar from "simplebar-react"
import Code from "./Code"
import { doc } from "@/constants/doc"
import "simplebar-react/dist/simplebar.min.css"

type Props = {}

const Doc: FC<Props> = ({ }) => {
  return (
    <div className="container pt-40 max-w-7xl mx-auto w-full">
      <div className="flex flex-col items-center gap-6">
        <Heading className="text-3xl md:text-4xl lg:text-5xl">
            Making a Request
        </Heading>
        <Paragraph className="text-xl -mt-4 sm:text-2xl text-secondary-foreground font-medium">
            api/v1/compare
        </Paragraph>
        <div className="max-w-2xl lg:max-w-4xl w-full bg-card border rounded-sm py-5 px-5 text-lg lg:text-xl border-border">
          <SimpleBar>
            <Code code={doc} animated />
          </SimpleBar>
        </div>
      </div>
    </div>
  )
}

export default Doc