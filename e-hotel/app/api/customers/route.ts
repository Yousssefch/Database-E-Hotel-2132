import { prisma } from '@/app/database/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const customers = await prisma.customer.findMany()
  return NextResponse.json(customers)
}

export async function POST(req: Request) {
  const data = await req.json()

  // Handle customer creation, making sure to include new fields like profilePictureURL
  const customer = await prisma.customer.create({
    data: {
      ...data, // Assuming the incoming data includes fields like profilePictureURL
    }
  })
  return NextResponse.json(customer)
}
