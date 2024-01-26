import type { NextApiRequest, NextApiResponse } from "next"
import { dbClient } from "@/db/functions"
import { getAuth } from "@clerk/nextjs/server"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = getAuth(req)

  if (!userId) {
    res.status(401).json({})
    return
  }

  const usersResponse = await dbClient.getUser(userId)

  if (usersResponse.length > 0) {
    res.status(200).json({})
    return
  }

  await dbClient.addUser(userId)

  res.status(200).json({})
}
