import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { auth0 } from '@/lib/auth0';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const session = await auth0.getSession();
    if (!session?.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const dbUser = await prisma.user.findUnique({ where: { email: session.user.email } });
    return NextResponse.json(dbUser);
}

export async function POST(req: NextRequest) {
    const session = await auth0.getSession();
    if (!session?.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const data = await req.json();
    const dbUser = await prisma.user.upsert({
        where: { email: session.user.email },
        update: data,
        create: {
            email: session.user.email,
            name: session.user.name,
            picture: session.user.picture,
            ...data,
        },
    });
    return NextResponse.json(dbUser);
}
