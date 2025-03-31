import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { PrismaClient, Customer, Employee } from '@prisma/client';
import { randomUUID } from 'crypto';

// Create a new Prisma client instance
const prisma = new PrismaClient();

export async function POST(request: Request) {
    console.log('Login API called');
    try {
        const data = await request.json();
        console.log('Login data received:', data);
        
        // Validate input data
        if (!data.name || !data.ssn_sin) {
            console.error('Missing required fields');
            return NextResponse.json(
                { 
                    success: false, 
                    message: 'Missing required fields: name or ssn_sin' 
                },
                { status: 400 }
            );
        }
        
        // Default to client login if userType is not specified
        const userType = data.userType || 'client';
        console.log(`Attempting ${userType} login`);
        
        try {
            // Set up variables for both types
            let customerUser: Customer | null = null;
            let employeeUser: (Employee & { hotel: any }) | null = null;
            let isEmployee = false;
            
            // Check if this is a client or employee login
            if (userType === 'client') {
                // Find the customer in the database
                customerUser = await prisma.customer.findUnique({
                    where: {
                        ssn_sin: data.ssn_sin,
                    }
                });
                
                // Check if customer exists and name matches
                if (!customerUser || customerUser.fullName !== data.name) {
                    return NextResponse.json(
                        { 
                            success: false, 
                            message: 'Invalid client SSN/SIN or name' 
                        },
                        { status: 401 }
                    );
                }
                
                console.log('Customer found:', customerUser);
            } else {
                // Find the employee in the database
                employeeUser = await prisma.employee.findFirst({
                    where: {
                        ssn_sin: data.ssn_sin,
                    },
                    include: {
                        hotel: true
                    }
                });
                
                // Check if employee exists and name matches
                if (!employeeUser || employeeUser.fullName !== data.name) {
                    return NextResponse.json(
                        { 
                            success: false, 
                            message: 'Invalid employee SSN/SIN or name' 
                        },
                        { status: 401 }
                    );
                }
                
                isEmployee = true;
                console.log('Employee found:', employeeUser);
            }
            
            // Create a session
            const sessionId = randomUUID();
            const cookieExpires = new Date();
            cookieExpires.setDate(cookieExpires.getDate() + 7); // 1 week
            
            // Create user data object based on type
            const userData = isEmployee && employeeUser 
                ? {
                    id: employeeUser.id,
                    name: employeeUser.fullName,
                    ssn_sin: employeeUser.ssn_sin,
                    address: employeeUser.address,
                    role: employeeUser.role,
                    hotelId: employeeUser.hotelId,
                    hotelName: employeeUser.hotel.name
                }
                : customerUser 
                ? {
                    name: customerUser.fullName,
                    ssn_sin: customerUser.ssn_sin,
                    address: customerUser.address,
                    date_of_registration: customerUser.registrationDate.toISOString()
                }
                : {}; // This should never happen
            
            // Create response with the user data
            const response = NextResponse.json({
                success: true,
                message: 'Login successful',
                userType: isEmployee ? 'employee' : 'client',
                user: userData
            });
            
            // Set session cookie
            response.cookies.set({
                name: 'session',
                value: sessionId,
                expires: cookieExpires,
                httpOnly: true,
                path: '/',
            });
            
            // Set user info cookies
            const userId = isEmployee && employeeUser 
                ? employeeUser.ssn_sin 
                : customerUser ? customerUser.ssn_sin : '';
                
            response.cookies.set({
                name: 'user_id',
                value: userId,
                expires: cookieExpires,
                path: '/',
            });
            
            // Set user type cookie
            response.cookies.set({
                name: 'user_type',
                value: isEmployee ? 'employee' : 'client',
                expires: cookieExpires,
                path: '/',
            });
            
            return response;
            
        } catch (dbError: any) {
            console.error('Database error details:', {
                name: dbError?.name,
                message: dbError?.message,
                code: dbError?.code,
                meta: dbError?.meta,
                stack: dbError?.stack
            });
            
            return NextResponse.json(
                { 
                    success: false, 
                    message: 'Login failed',
                    details: dbError instanceof Error ? dbError.message : String(dbError)
                },
                { status: 500 }
            );
        }
    } catch (error: any) {
        console.error('Login error details:', {
            name: error?.name,
            message: error?.message,
            stack: error?.stack
        });
        
        return NextResponse.json(
            { 
                success: false, 
                message: 'An error occurred during login',
                details: error instanceof Error ? error.message : String(error)
            },
            { status: 500 }
        );
    }
} 