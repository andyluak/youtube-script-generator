import { GetServerSideProps } from "next"
import { Project } from "@/db/schema"
import NoProjects from "@/views/projects/NoProjects"
import Projects from "@/views/projects/Projects"
import { useUser } from "@clerk/nextjs"
import { buildClerkProps, getAuth } from "@clerk/nextjs/server"
import { useQuery } from "@tanstack/react-query"

export default function Home() {
  const { data, isLoading } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await fetch("/api/projects")
      return res.json()
    },
  })

  if (!data && !isLoading) return <NoProjects />

  if (data && !isLoading) return <Projects projects={data} />
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { userId } = getAuth(ctx.req)

  if (!userId) {
    return { redirect: { destination: "/sign-in", permanent: false } }
  }

  return { props: { ...buildClerkProps(ctx.req) } }
}
