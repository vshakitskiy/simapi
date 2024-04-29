"use client"

import { useTheme } from "next-themes"
import { useEffect, useState, type FC } from "react"
import { Highlight, themes } from "prism-react-renderer"

type Props = {
  code: string
  animationDelay?: number
  animated?: boolean
}

const Code: FC<Props> = ({
  code, animated, animationDelay
}) => {
  const { resolvedTheme } = useTheme()
  const [text, setText] = useState(animated ? "" : code)

  useEffect(() => {
    if (animated) {
      let i = 0
      setTimeout(() => {
        const intervalId = setInterval(() => {
          setText(code.slice(0, i))
          i++
          if (i > code.length)
            clearInterval(intervalId)
        }, 15)

        return () => clearInterval(intervalId)
      }, animationDelay || 150)  
    }
  }, [code, animated, animationDelay])

  const lines = text.split(/\r\n|\r|\n/).length
  const theme = resolvedTheme === "dark" ? themes.dracula : themes.github

  return (
    <Highlight code={text} language="typescript" theme={theme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => <pre
        className={className + "transition-all w-fit bg-transparent duration-100 py-0 no-scrollbar"}
        style={{
          maxHeight: 28 * lines,
        }}
      >
        {tokens.map((line, i) => {
          const { key, ...props } = getLineProps({ line, key: i })

          return (
            <div
              key={`line-${i}`}
              style={{ position: "relative" }}
              {...props}
            >
              {line.map((token, i) => {
                const { key, ...props } = getTokenProps({ token, i })

                return <span key={i} {...props}></span>
              })}
            </div>
          )
        })}
      </pre>
      }
    </Highlight>
  )
}

export default Code