import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    try {
        const data = await request.json();
        console.log('Login data:', data);
        
        // Forward the request to the Flask backend
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            credentials: 'include',
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
            // Get the session cookie from the response
            const responseHeaders = new Headers(response.headers);
            const setCookieHeader = responseHeaders.get('set-cookie');
            
            // Create the response with the session cookie
            const nextResponse = NextResponse.json(result);
            
            if (setCookieHeader) {
                nextResponse.headers.set('Set-Cookie', setCookieHeader);
            }
            
            return nextResponse;
        } else {
            return NextResponse.json(
                { 
                    success: false, 
                    message: result.message || 'Login failed',
                    details: result
                },
                { status: response.status }
            );
        }
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { 
                success: false, 
                message: 'An error occurred during login',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
} 