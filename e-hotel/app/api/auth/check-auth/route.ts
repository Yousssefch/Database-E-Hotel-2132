import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
    try {
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get('session');

        const response = await fetch('http://localhost:5000/api/auth/check-auth', {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': sessionCookie ? `session=${sessionCookie.value}` : '',
            },
        });

        // Log the response for debugging
        console.log('Check-auth response status:', response.status);
        const responseText = await response.text();
        console.log('Check-auth response text:', responseText);

        let data;
        try {
            data = JSON.parse(responseText);
        } catch (e) {
            console.error('Failed to parse check-auth response as JSON:', e);
            return NextResponse.json({ authenticated: false }, { status: 401 });
        }

        if (!response.ok) {
            return NextResponse.json({ authenticated: false }, { status: 401 });
        }

        // Forward the session cookie if it exists in the response
        const responseHeaders = new Headers(response.headers);
        const setCookieHeader = responseHeaders.get('set-cookie');
        
        const nextResponse = NextResponse.json(data);
        
        if (setCookieHeader) {
            nextResponse.headers.set('Set-Cookie', setCookieHeader);
        }

        return nextResponse;
    } catch (error) {
        console.error('Auth check failed:', error);
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }
} 