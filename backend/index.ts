import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
async function main() {
  // ... you will write your Prisma Client queries here
  const allUsers = await prisma.user.findMany()
  console.log(allUsers)
}

async function main() {
  await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@prisma.io",
      posts: {
        create: { title: "Hello World" },
      },
      profile: {
        create: { bio:  "I like turtles" }
      }
    }
  })
  const allUsers = await prisma.user.findMany({
    include: { 
      posts: true,
      profile: true 
    },
  })
  console.dir(allUsers, { depth: null })
}
