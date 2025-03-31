import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { PrismaClient } from '@prisma/client';

// Create a new Prisma client instance
const prisma = new PrismaClient();

export async function GET() {
    console.log('Check-auth API called');
    try {
        // Get cookies from the request
        const cookiesList = cookies();
        
        // Access cookies using the .get() method
        const sessionCookie = cookiesList.get('session');
        const userIdCookie = cookiesList.get('user_id');
        const userTypeCookie = cookiesList.get('user_type');
        
        const sessionCookieValue = sessionCookie?.value;
        const userIdCookieValue = userIdCookie?.value;
        const userTypeCookieValue = userTypeCookie?.value;
        
        console.log('Session cookie:', sessionCookieValue);
        console.log('User ID cookie:', userIdCookieValue);
        console.log('User type cookie:', userTypeCookieValue);
        
        // If session or user_id cookie is missing, user is not authenticated
        if (!sessionCookieValue || !userIdCookieValue) {
            console.log('Missing session or user_id cookie, authentication failed');
            return NextResponse.json({ authenticated: false }, { status: 401 });
        }
        
        // Determine user type - default to client for backward compatibility
        const userType = userTypeCookieValue || 'client';
        
        try {
            // Different authentication paths for clients and employees
            if (userType === 'employee') {
                // Find employee by SSN/SIN
                const employee = await prisma.employee.findFirst({
                    where: {
                        ssn_sin: userIdCookieValue
                    },
                    include: {
                        hotel: true
                    }
                });
                
                if (!employee) {
                    console.log('Employee not found in database');
                    return NextResponse.json({ authenticated: false }, { status: 401 });
                }
                
                console.log('Employee authenticated successfully:', employee.fullName);
                
                // Return employee data
                return NextResponse.json({
                    authenticated: true,
                    userType: 'employee',
                    user: {
                        id: employee.id,
                        name: employee.fullName,
                        ssn_sin: employee.ssn_sin,
                        address: employee.address,
                        role: employee.role,
                        hotelId: employee.hotelId,
                        hotelName: employee.hotel.name
                    }
                });
            } else {
                // Client authentication (existing flow)
                const customer = await prisma.customer.findUnique({
                    where: {
                        ssn_sin: userIdCookieValue
                    }
                });
                
                if (!customer) {
                    console.log('Customer not found in database');
                    return NextResponse.json({ authenticated: false }, { status: 401 });
                }
                
                console.log('Customer authenticated successfully:', customer.fullName);
                
                // Return customer data
                return NextResponse.json({
                    authenticated: true,
                    userType: 'client',
                    user: {
                        name: customer.fullName,
                        ssn_sin: customer.ssn_sin,
                        address: customer.address,
                        date_of_registration: customer.registrationDate.toISOString(),
                        profilePictureURL : customer.profilePictureURL
                    }
                });
            }
        } catch (dbError: any) {
            console.error('Database error during auth check:', dbError);
            return NextResponse.json({ authenticated: false }, { status: 500 });
        }
    } catch (error) {
        console.error('Auth check failed:', error);
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }
} 