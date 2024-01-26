import { GetServerSideProps } from "next"
import NoProjects from "@/views/projects/NoProjects"
import { useUser } from "@clerk/nextjs"
import { buildClerkProps, getAuth } from "@clerk/nextjs/server"

export default function Home() {
  const { user } = useUser()

  return <NoProjects />
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { userId } = getAuth(ctx.req)

  if (!userId) {
    return { redirect: { destination: "/sign-in", permanent: false } }
  }

  return { props: { ...buildClerkProps(ctx.req) } }
}
