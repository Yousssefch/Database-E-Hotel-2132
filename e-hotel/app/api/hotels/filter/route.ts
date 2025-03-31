import { prisma } from '@/app/database/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const chain = searchParams.get('chain')
    const minCapacity = searchParams.get('minCapacity')
    const amenities = searchParams.get('amenities')?.split(',')
    const minRating = searchParams.get('minRating')
    const maxRating = searchParams.get('maxRating')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '9')
    const skip = (page - 1) * limit

    // Base query with includes
    const query: any = {
      include: {
        hotelChain: true,
        rooms: true
      }
    }

    // Add where conditions
    const where: any = {}

    // Nested query
    if (chain && chain !== 'all') {
      where.hotelChain = {
        name: {
          equals: chain,
          mode: 'insensitive' 
        }
      }
    }

    // Filter by rating range
    if (minRating) {
      where.rating = {
        ...where.rating,
        gte: parseFloat(minRating)
      }
    }
    if (maxRating) {
      where.rating = {
        ...where.rating,
        lte: parseFloat(maxRating)
      }
    }

    // Filter by room capacity (aggregation)
    if (minCapacity) {
      where.rooms = {
        some: {
          capacity: {
            gte: parseInt(minCapacity)
          }
        }
      }
    }

    // Nested query for amenities
    if (amenities && amenities.length > 0) {
      where.rooms = {
        some: {
          amenities: {
            contains: amenities.join(',')
          }
        }
      }
    }

    // Add where conditions to the query
    if (Object.keys(where).length > 0) {
      query.where = where
    }

    // Get total count for pagination
    const total = await prisma.hotel.count({ where: query.where })

    // Add pagination to query
    query.skip = skip
    query.take = limit

    const hotels = await prisma.hotel.findMany(query)

    return NextResponse.json({
      hotels,
      total,
      page,
      limit
    })
  } catch (error) {
    console.error('Error filtering hotels:', error)
    return NextResponse.json(
      { error: 'Failed to filter hotels' },
      { status: 500 }
    )
  }
} 