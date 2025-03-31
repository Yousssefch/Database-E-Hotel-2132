import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Create a new Prisma client instance directly in this file
const prisma = new PrismaClient();

export async function POST(request: Request) {
    console.log('Register API called');
    try {
        const data = await request.json();
        console.log('Registration data received:', data);
        
        // Validate input data
        if (!data.ssn || !data.name || !data.address) {
            console.error('Missing required fields');
            return NextResponse.json(
                { 
                    success: false, 
                    message: 'Missing required fields: ssn, name, or address' 
                },
                { status: 400 }
            );
        }
        
        try {
            console.log('Attempting to create customer with:', {
                ssn_sin: data.ssn,
                fullName: data.name,
                address: data.address
            });
            
            // Use Prisma directly instead of making another API call
            const customer = await prisma.customer.create({
                data: {
                    ssn_sin: data.ssn,
                    fullName: data.name,
                    address: data.address,
                    registrationDate: new Date(),
                    profilePictureURL: data.profilePicture || 'default_profile.jpg'
                }
            });
            
            console.log('Customer created successfully:', customer);
            
            return NextResponse.json({
                success: true,
                message: 'Registration successful',
                user: customer
            });
            
        } catch (dbError: any) {
            console.error('Database error details:', {
                name: dbError?.name,
                message: dbError?.message,
                code: dbError?.code,
                meta: dbError?.meta,
                stack: dbError?.stack
            });
            
            // Check for duplicate key error
            if (dbError?.code === 'P2002') {
                return NextResponse.json(
                    { 
                        success: false, 
                        message: 'A user with this SSN/SIN already exists'
                    },
                    { status: 409 }
                );
            }
            
            return NextResponse.json(
                { 
                    success: false, 
                    message: 'Registration failed',
                    details: dbError instanceof Error ? dbError.message : String(dbError)
                },
                { status: 500 }
            );
        }
    } catch (error: any) {
        console.error('Registration error details:', {
            name: error?.name,
            message: error?.message,
            stack: error?.stack
        });
        
        return NextResponse.json(
            { 
                success: false, 
                message: 'An error occurred during registration',
                details: error instanceof Error ? error.message : String(error)
            },
            { status: 500 }
        );
    }
} 