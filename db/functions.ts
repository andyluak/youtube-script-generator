import { eq } from "drizzle-orm"

import { db } from "."
import { users } from "./schema"

class DBClient {
  // User functions
  async getUser(userId: string) {
    return await db.select().from(users).where(eq(users.clerkId, userId))
  }

  async addUser(userId: string) {
    return await db.insert(users).values({
      clerkId: userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }
}

export const dbClient = new DBClient()
