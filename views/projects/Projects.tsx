import React from "react"
import Link from "next/link"
import { Project } from "@/db/schema"

import Typography from "@/components/ui/typography"

type Props = {
  projects: Project[]
}

function Projects({ projects }: Props) {
  return (
    <div className="flex flex-col gap-8">
      <Typography.h1>Projects</Typography.h1>
      <div className="grid grid-cols-4 gap-4 text-primary-contrast">
        {projects.map((p) => (
          <Link
            className="flex flex-col gap-8 p-4 bg-primary-dark rounded-lg shadow-md hover:bg-primary"
            key={p.id}
            href={`/projects/${p.id}`}
          >
            <Typography.large>{p.title}</Typography.large>
            <Typography.p>{p.description}</Typography.p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Projects
