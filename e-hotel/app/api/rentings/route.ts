import { prisma } from '@/app/database/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const rentings = await prisma.renting.findMany({ 
      include: { 
        customer: true, 
        employee: true, 
        room: { 
          include: { 
            hotel: true 
          } 
        }, 
        booking: true 
      } 
    })
    return NextResponse.json(rentings)
  } catch (error) {
    console.error("Error fetching rentings:", error)
    return NextResponse.json({ error: "Failed to fetch rentings" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const renting = await prisma.renting.create({ data })
    return NextResponse.json(renting)
  } catch (error) {
    console.error("Error creating renting:", error)
    return NextResponse.json({ error: "Failed to create renting" }, { status: 500 })
  }
}
