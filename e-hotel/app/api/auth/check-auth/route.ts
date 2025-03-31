import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { PrismaClient } from '@prisma/client';

// Create a new Prisma client instance
const prisma = new PrismaClient();

export async function GET() {
    console.log('Check-auth API called');
    try {
        const cookieStore = cookies();
        const sessionCookie = cookieStore.get('session');
        const userIdCookie = cookieStore.get('user_id');
        
        console.log('Session cookie:', sessionCookie?.value);
        console.log('User ID cookie:', userIdCookie?.value);
        
        // If session or user_id cookie is missing, user is not authenticated
        if (!sessionCookie || !userIdCookie) {
            console.log('Missing session or user_id cookie, authentication failed');
            return NextResponse.json({ authenticated: false }, { status: 401 });
        }
        
        try {
            // Get user information using the user_id cookie
            const customer = await prisma.customer.findUnique({
                where: {
                    ssn_sin: userIdCookie.value
                }
            });
            
            if (!customer) {
                console.log('User not found in database');
                return NextResponse.json({ authenticated: false }, { status: 401 });
            }
            
            console.log('User authenticated successfully:', customer.fullName);
            
            // Return user data
            return NextResponse.json({
                authenticated: true,
                user: {
                    name: customer.fullName,
                    ssn_sin: customer.ssn_sin,
                    address: customer.address,
                    date_of_registration: customer.registrationDate.toISOString()
                }
            });
            
        } catch (dbError: any) {
            console.error('Database error during auth check:', dbError);
            return NextResponse.json({ authenticated: false }, { status: 500 });
        }
    } catch (error) {
        console.error('Auth check failed:', error);
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }
} 