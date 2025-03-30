import { prisma } from '@/app/database/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const employees = await prisma.employee.findMany({ include: { hotel: true } })
  return NextResponse.json(employees)
}

export async function POST(req: Request) {
  const data = await req.json()
  const employee = await prisma.employee.create({ data })
  return NextResponse.json(employee)
}
