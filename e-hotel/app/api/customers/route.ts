import { prisma } from '@/app/database/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const customers = await prisma.customer.findMany()
  return NextResponse.json(customers)
}

export async function POST(req: Request) {
  const data = await req.json()
  const customer = await prisma.customer.create({ data })
  return NextResponse.json(customer)
}
