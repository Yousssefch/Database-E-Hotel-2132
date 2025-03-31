import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { PrismaClient } from '@prisma/client';
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
        
        try {
            // Find the customer in the database
            const customer = await prisma.customer.findUnique({
                where: {
                    ssn_sin: data.ssn_sin,
                }
            });
            
            // Check if customer exists and name matches
            if (!customer || customer.fullName !== data.name) {
                return NextResponse.json(
                    { 
                        success: false, 
                        message: 'Invalid SSN/SIN or name' 
                    },
                    { status: 401 }
                );
            }
            
            console.log('Customer found:', customer);
            
            // Create a session
            const sessionId = randomUUID();
            const cookieExpires = new Date();
            cookieExpires.setDate(cookieExpires.getDate() + 7); // 1 week
            
            // Create response with the user data
            const response = NextResponse.json({
                success: true,
                message: 'Login successful',
                user: {
                    name: customer.fullName,
                    ssn_sin: customer.ssn_sin,
                    address: customer.address,
                    date_of_registration: customer.registrationDate.toISOString()
                }
            });
            
            // Set session cookie
            response.cookies.set({
                name: 'session',
                value: sessionId,
                expires: cookieExpires,
                httpOnly: true,
                path: '/',
            });
            
            // Set user info in another cookie for easy access
            response.cookies.set({
                name: 'user_id',
                value: customer.ssn_sin,
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