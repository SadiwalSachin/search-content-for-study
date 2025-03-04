import {PrismaClient} from "@prisma/client"

export const prisma = new PrismaClient()


export default async function dbConnection () {
    try {
        const connectionInstance = await prisma.$connect()
        console.log('✅ Successfully connected to database')
        return true
    } catch (error) {
        console.error('❌ Database connection failed:', error)
        throw error
    }
}
