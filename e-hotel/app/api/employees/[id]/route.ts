// routes/api/employees/[id]/route.ts
import { prisma } from '@/app/database/prisma'
import { NextResponse } from 'next/server'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const employee = await prisma.employee.findUnique({ where: { id: +params.id } })
  return NextResponse.json(employee)
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json()

  // Handle the urlImage field (if provided)
  const updatedData = {
    ...data, // Spread other fields
    urlImage: data.urlImage || null, // Handle the case if urlImage is not provided
  }

  const updated = await prisma.employee.update({ 
    where: { id: +params.id }, 
    data: updatedData 
  })
  return NextResponse.json(updated)
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.employee.delete({ where: { id: +params.id } })
  return NextResponse.json({ deleted: true })
}
