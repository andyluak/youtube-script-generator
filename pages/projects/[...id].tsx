import React, { useState } from "react"
import { GetServerSideProps } from "next"
import { useParams } from "next/navigation"
import { Project } from "@/db/schema"
import Editor from "@/views/project/Editor"
import { buildClerkProps, getAuth } from "@clerk/nextjs/server"
import { useQuery } from "@tanstack/react-query"

type Props = {}

function ProjectItem({}: Props) {
  const { id } = useParams()
  const { data, isLoading } = useQuery<Project>({
    queryKey: ["project", id],
    queryFn: async () => {
      const res = await fetch(`/api/projects/${id}`)
      return res.json()
    },
  })

  if (!data && !isLoading) return null

  if (data && !isLoading) return <Editor project={data} />
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { userId } = getAuth(ctx.req)

  if (!userId) {
    return { redirect: { destination: "/sign-in", permanent: false } }
  }

  return { props: { ...buildClerkProps(ctx.req) } }
}

export default ProjectItem
