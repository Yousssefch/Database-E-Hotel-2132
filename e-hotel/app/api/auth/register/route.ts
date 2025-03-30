import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const data = await request.json();
        console.log('Registration data:', data);
        
        // Forward the request to the Flask backend
        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(data),
        });

        // Log the raw response for debugging
        console.log('Response status:', response.status);
        const responseText = await response.text();
        console.log('Response text:', responseText);

        let result;
        try {
            result = JSON.parse(responseText);
        } catch (e) {
            console.error('Failed to parse response as JSON:', e);
            return NextResponse.json(
                { 
                    success: false, 
                    message: 'Invalid response from server',
                    details: responseText
                },
                { status: 500 }
            );
        }
        
        if (response.ok) {
            return NextResponse.json(result);
        } else {
            return NextResponse.json(
                { 
                    success: false, 
                    message: result.message || 'Registration failed',
                    details: result
                },
                { status: response.status }
            );
        }
    } catch (error) {
        console.error('Registration error:', error);
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