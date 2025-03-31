import { prisma } from '@/app/database/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const employees = await prisma.employee.findMany({ include: { hotel: true } })
  return NextResponse.json(employees)
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    console.log('Employee registration data received:', data)
    
    // Validate required fields
    if (!data.fullName || !data.ssn_sin || !data.address || !data.hotelId || !data.role) {
      console.error('Missing required employee fields')
      return NextResponse.json(
        { 
          success: false, 
          message: 'Missing required fields for employee registration'
        },
        { status: 400 }
      )
    }

    // Check if hotel exists
    const hotel = await prisma.hotel.findUnique({
      where: { id: data.hotelId }
    })

    if (!hotel) {
      console.error(`Hotel with ID ${data.hotelId} not found`)
      return NextResponse.json(
        { 
          success: false, 
          message: 'Selected hotel not found'
        },
        { status: 404 }
      )
    }

    // Check if employee with same SSN already exists
    const existingEmployee = await prisma.employee.findFirst({
      where: { ssn_sin: data.ssn_sin }
    })

    if (existingEmployee) {
      console.error(`Employee with SSN ${data.ssn_sin} already exists`)
      return NextResponse.json(
        { 
          success: false, 
          message: 'An employee with this SSN/SIN already exists'
        },
        { status: 409 }
      )
    }

    // Create the employee
    const employee = await prisma.employee.create({ data })
    console.log('Employee created successfully:', employee)
    
    return NextResponse.json({
      success: true,
      message: 'Employee registered successfully',
      employee
    })
  } catch (error: any) {
    console.error('Employee registration error:', error)
    
    // Check for Prisma-specific errors
    if (error.code === 'P2002') {
      return NextResponse.json(
        { 
          success: false, 
          message: 'An employee with this information already exists'
        },
        { status: 409 }
      )
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to register employee',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}
