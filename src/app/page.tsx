import Paragraph from "@/ui/Paragraph"
import Heading from "@/ui/Heading"
import Link from "next/link"


const Home = () => {
  return (
    <main className="h-screen overflow-x-hidden">
      <div className="container pt-40 max-w-7xl mx-auto w-full">
        <div className="relative gap-5 flex flex-col justify-center items-center">
          <div className="blur-3xl absolute gradient-landing w-3/4 h-full -z-10" />
          <Heading size="lg" className="lg:text-center py-2">
            Determine text <br /> similarity with <span className="text-landing pr-1">ease</span>.
          </Heading>
          <Paragraph className="max-w-xl">
            With the SimApi, you can easily determine the similarity between between two pieces of text with a{" "}
            <Link href="/login" className="underline underline-offset-2 text-landing">
              API key
            </Link>
            .
          </Paragraph>
        </div>
      </div>
    </main>
  )
}

export default Home
