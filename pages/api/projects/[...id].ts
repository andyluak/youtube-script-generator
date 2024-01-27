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
  const projectIdParam = req.query.id

  if (
    !projectIdParam ||
    !projectIdParam[0] ||
    isNaN(parseInt(projectIdParam[0]))
  ) {
    res.status(400).json({
      error: "Missing required fields",
    })
    return
  }

  if (req.method === "GET") {
    try {
      const projectsResponse = await db
        .select()
        .from(projects)
        .where(eq(projects.id, parseInt(projectIdParam[0])))

      res.status(200).json(projectsResponse[0])
    } catch (error) {
      res.status(500).json({ error })
    }
  }

  res.status(405).json({
    error: `${req.method} not allowed`,
  })
}
