import { NextResponse } from "next/server";
import { prisma } from '@/app/database/prisma';

export async function GET() {
    try {
        // Check authentication
        const authResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/check-auth`, {
            credentials: 'include'
        });
        
        if (!authResponse.ok) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const authData = await authResponse.json();
        
        // Check if user is an employee
        if (authData.userType !== "employee") {
            return NextResponse.json({ error: "Only employees can access archives" }, { status: 403 });
        }

        // Fetch all archives
        const archives = await prisma.archives.findMany({
            orderBy: {
                checkInDate: 'desc'
            }
        });

        return NextResponse.json(archives);
    } catch (error) {
        console.error("Error fetching archives:", error);
        return NextResponse.json(
            { error: "Failed to fetch archives" },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
  const body = await req.json()
  const archive = await prisma.archives.create({ data: body })
  return NextResponse.json(archive)
}
