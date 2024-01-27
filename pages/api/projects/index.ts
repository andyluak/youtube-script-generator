import type { NextApiRequest, NextApiResponse } from "next"
import { db } from "@/db"
import { projects, users } from "@/db/schema"
import { getAuth } from "@clerk/nextjs/server"
import { eq } from "drizzle-orm"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = getAuth(req)

  if (!userId) {
    res.status(401).json({})
    return
  }

  const user = await db.select().from(users).where(eq(users.clerkId, userId))

  if (req.method === "GET") {
    try {
      const projectsResponse = await db
        .select()
        .from(projects)
        .where(eq(projects.userId, user[0].id))

      res.status(200).json(projectsResponse)
    } catch (error) {
      res.status(500).json({ error })
    }
  }

  if (req.method === "POST") {
    const { title, description, videoType } = req.body

    if (!title || !description || !videoType) {
      res.status(400).json({
        error: "Missing required fields",
      })
    }

    try {
      const projectResponse = await db.insert(projects).values({
        userId: user[0].id,
        title,
        description,
        videoType,
      })

      res.status(201).json(projectResponse)
    } catch (error) {
      res.status(500).json({ error })
    }
  }

  res.status(405).json({
    error: `${req.method} not allowed`,
  })
}
