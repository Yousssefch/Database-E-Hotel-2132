import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { userType: string, userId: string } }) {
    const { userType, userId } = params;

    try {
        if (userType === 'client') {
            const user = await prisma.customer.findUnique({
                where: { ssn_sin: userId }
            });
            if (user) {
                return NextResponse.json({ success: true, user });
            }
        } else if (userType === 'employee') {
            const user = await prisma.employee.findUnique({
                where: { ssn_sin: userId },
                include: { hotel: true }
            });
            if (user) {
                return NextResponse.json({
                    success: true,
                    user: {
                        ...user,
                        hotelName: user.hotel.name
                    }
                });
            }
        }

        return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}

// ============================
// CHANGE PASSWORD ENDPOINT (POST)
// ============================
export async function POST(req: Request, { params }: { params: { userType: string, userId: string } }) {
    const { userType, userId } = params;
    const { ssn_sin, newssn_sin } = await req.json();

    if (!ssn_sin || !newssn_sin) {
        return NextResponse.json({ success: false, message: 'Old and new passwords are required' }, { status: 400 });
    }

    try {
        let user;

        if (userType === 'client') {
            user = await prisma.customer.findUnique({
                where: { ssn_sin: userId }
            });
        } else if (userType === 'employee') {
            user = await prisma.employee.findUnique({
                where: { ssn_sin: userId }
            });
        }

        if (!user) {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
        }

        if (ssn_sin !== user.ssn_sin) {
            return NextResponse.json({ success: false, message: 'Old password is incorrect' }, { status: 401 });
        }

        if (userType === 'client') {
            await prisma.customer.update({
                where: { ssn_sin: userId },
                data: { ssn_sin: newssn_sin }
            });
        } else if (userType === 'employee') {
            await prisma.employee.update({
                where: { ssn_sin: userId },
                data: { ssn_sin: newssn_sin }
            });
        }

        return NextResponse.json({ success: true, message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}

// ============================
// UPDATE PROFILE PICTURE ENDPOINT (PUT)
// ============================
export async function PUT(req: Request, { params }: { params: { userType: string, userId: string } }) {
    const { userType, userId } = params;
    const { profilePictureURL } = await req.json();

    if (!profilePictureURL) {
        return NextResponse.json({ success: false, message: 'Profile picture URL is required' }, { status: 400 });
    }

    try {
        if (userType === 'client') {
            await prisma.customer.update({
                where: { ssn_sin: userId },
                data: { profilePictureURL }
            });
        } else if (userType === 'employee') {
            await prisma.employee.update({
                where: { ssn_sin: userId },
                data: { profilePictureURL }
            });
        }

        return NextResponse.json({ success: true, message: 'Profile picture updated successfully' });
    } catch (error) {
        console.error('Error updating profile picture:', error);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}

